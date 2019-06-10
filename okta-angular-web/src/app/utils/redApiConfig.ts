export const apiConf = {
    host: "http://localhost",
    port: ":8080",
}

const APIURL = apiConf.host + apiConf.port;

export const redApiUrls = {
    apiUrl: APIURL,
    helloUrl: APIURL + "/api/hello",
    helloAdminUrl: APIURL + "/auth/admin/hello",
    helloDevUrl: APIURL + "/auth/dev/hello",
    dataUrl: APIURL + "auth/admin/data",
}