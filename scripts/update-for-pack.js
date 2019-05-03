"use strict";
exports.__esModule = true;
var execa = require("execa");
var fs_1 = require("fs");
var path_1 = require("path");
var packagesDir = path_1.resolve(__dirname, '..', 'packages');
var packages = fs_1.readdirSync(packagesDir).reduce(function (all, packageDirectoryName) {
    var packageDirectoryPath = path_1.resolve(packagesDir, packageDirectoryName);
    var packageJsonFile = path_1.resolve(packageDirectoryPath, 'package.json');
    var json = fs_1.readFileSync(packageJsonFile).toString();
    var info = JSON.parse(json);
    var packageName = info.name, version = info.version;
    var tarballName = packageName.replace('@', '').replace('/', '-') + "-" + version + ".tgz";
    return all.concat([
        {
            json: json,
            packageDirectoryName: packageDirectoryName,
            packageDirectoryPath: packageDirectoryPath,
            packageJsonFile: packageJsonFile,
            packageName: packageName,
            tarballFile: path_1.resolve(packageDirectoryPath, tarballName),
            tarballName: tarballName,
            version: version
        },
    ]);
}, []);
packages.forEach(function (packageInfo) {
    var updatedJson = packages.reduce(function (packageJson, p) {
        var localRef = "file:../" + p.packageDirectoryName;
        var tarballLocalRef = path_1.resolve(__dirname, p.tarballName);
        return packageJson.replace(localRef, tarballLocalRef);
    }, packageInfo.json);
    fs_1.writeFileSync(packageInfo.packageJsonFile, updatedJson);
    execa.shellSync('npm pack', {
        cwd: packageInfo.packageDirectoryPath,
        stdio: 'inherit'
    });
    fs_1.writeFileSync(packageInfo.packageJsonFile, packageInfo.json);
    execa.shellSync("mv " + packageInfo.tarballFile + " " + path_1.resolve(__dirname, packageInfo.tarballName));
});
