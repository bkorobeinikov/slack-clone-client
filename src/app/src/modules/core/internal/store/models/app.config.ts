export interface IAppInitializeOptions {
    /**
     * The base URL for all locations.
     * If your app is served from a sub-directory on your server, you’ll want to set this to the sub-directory.
     * A properly formatted basename should have a leading slash, but no trailing slash.
     */
    basename: string;
}

export interface IAppConfig {
    /**
     * The base URL for all locations.
     * If your app is served from a sub-directory on your server, you’ll want to set this to the sub-directory.
     * A properly formatted basename should have a leading slash, but no trailing slash.
     */
    basename: string;
}
