export function pathInsert(templatePath, params) {
    let realPath = templatePath;

    for (const key in params) {
        realPath = realPath.replace(`:${key}`, params[key]);
    }

    return realPath;
}
