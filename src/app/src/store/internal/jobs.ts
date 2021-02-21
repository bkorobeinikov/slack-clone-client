import { CallEffect } from 'redux-saga/effects';
import { cancelled, put, call, all, SagaResult } from './effects';

import { IFeatureDef } from './feature';
import { defineMsg, withPayload } from './message';

interface IJobGroupOptions<TJobGroupName> {
    name: TJobGroupName;
}

export interface IJobGroup<TJobGroupName> {
    name: TJobGroupName;

    execute(): SagaResult<void>;

    addJob(task: IJob<TJobGroupName>): void;
    removeJob(task: IJob<TJobGroupName>): void;
}

export interface IJobGroup<TJobGroupName> {
    name: TJobGroupName;
}

export interface IJob<_TJobGroupName> {
    worker: () => SagaResult<void>;
}

type JobGroupMsgType<TJobGroupName extends string, TMsgType extends string> = `${Lowercase<`[job-group:${TJobGroupName}] ${TMsgType}`>}`;

export function createJobGroup<
    TFeatureName extends `[${string}]`,
    TState,
    TJobGroupName extends string,
    _TCoordinatorState = Record<string, unknown>
>(
    featureDef: IFeatureDef<TFeatureName, TState>,
    options: IJobGroupOptions<TJobGroupName>,
): IJobGroup<`${TFeatureName} [job-group:${TJobGroupName}]`> {
    const defineCoordinatorMsg = <TName extends string>(name: `${TName}`) => {
        const type = `[job-group:${options.name}] ${name}` as JobGroupMsgType<TJobGroupName, TName>;
        return defineMsg(featureDef, type, withPayload());
    };

    const beganMsg = defineCoordinatorMsg('began');
    const doneMsg = defineCoordinatorMsg('done');
    const failedMsg = defineCoordinatorMsg('failed');
    const cancelledMsg = defineCoordinatorMsg('cancelled');

    const jobBeganMsg = defineCoordinatorMsg('job_began');
    const jobDoneMsg = defineCoordinatorMsg('job_done');
    const jobFailedMsg = defineCoordinatorMsg('job_failed');
    const jobCancelledMsg = defineCoordinatorMsg('job_cancelled');

    const jobs: IJob<TJobGroupName>[] = [];

    const execute = function* () {
        try {
            yield put(beganMsg({}));
            const statuses: boolean[] = yield all(
                jobs.map(job => {
                    return call(function* () {
                        try {
                            yield put(jobBeganMsg({}));
                            yield job.worker();
                            yield put(jobDoneMsg({}));

                            return true;
                        } catch {
                            yield put(jobFailedMsg({}));
                        } finally {
                            if (yield cancelled()) {
                                yield put(jobCancelledMsg({}));
                            }
                        }

                        return false;
                    });
                }),
            );

            if (~statuses.indexOf(false)) {
                throw new Error(`failed to execute jobgroup ${options.name}`);
            }

            // check if all job finished properly

            yield put(doneMsg({}));
        } catch {
            yield put(failedMsg({}));
        } finally {
            if (yield cancelled()) {
                yield put(cancelledMsg({}));
            }
        }
    };

    return {
        name: `${featureDef.featureName} [job-group:${options.name}]` as `${TFeatureName} [job-group:${TJobGroupName}]`,
        execute,
        addJob: job => {
            jobs.push(job);
        },
        removeJob: job => {
            jobs.splice(jobs.indexOf(job));
        },
    };
}

export function createJob<TJobGroupName>(_jobGroup: IJobGroup<TJobGroupName>, worker: () => SagaResult<void>): IJob<TJobGroupName> {
    return {
        worker,
    };
}

export function useJob<TJobGroupName>(jobGroup: IJobGroup<TJobGroupName>, job: IJob<TJobGroupName>): CallEffect<void> {
    return call(function* () {
        jobGroup.addJob(job);
        yield call(() => 1);
    });
}

export function runJobs<TJobGroupName>(jobGroup: IJobGroup<TJobGroupName>): CallEffect<SagaResult<void>> {
    return call(jobGroup.execute);
}
