"use strict";
exports.__esModule = true;
var execa = require("execa");
var fs_1 = require("fs");
var path_1 = require("path");
var packagesDir = path_1.resolve(__dirname, '..', 'packages');
var localTarballDir = path_1.resolve(__dirname, 'packed');
fs_1.mkdirSync(localTarballDir);
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
            localTarballFile: path_1.resolve(localTarballDir, tarballName),
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
        return packageJson.replace("file:../" + p.packageDirectoryName, p.localTarballFile);
    }, packageInfo.json);
    fs_1.writeFileSync(packageInfo.packageJsonFile, updatedJson);
    try {
        execa.shellSync('npm pack', {
            cwd: packageInfo.packageDirectoryPath,
            stdio: 'inherit'
        });
    }
    catch (ex) {
        console.log('npm pack failed with error: ', ex);
    }
    fs_1.writeFileSync(packageInfo.packageJsonFile, packageInfo.json);
    execa.shellSync("mv " + packageInfo.tarballFile + " " + packageInfo.localTarballFile);
});
packages
    .filter(function (p) { return p.packageName === 'bpl-cli'; })
    .forEach(function (p) {
    execa.shellSync("npm install -g " + p.localTarballFile, { stdio: 'inherit' });
    execa.shellSync('npm run test:functional', {
        cwd: p.packageDirectoryPath,
        stdio: 'inherit'
    });
});
packages
    .filter(function (p) { return p.packageName.indexOf('plugin') !== -1; })
    .forEach(function (p) {
    execa.shellSync("bpl plugins:install file:" + p.localTarballFile, { stdio: 'inherit' });
    execa.shellSync('npm run test:functional', {
        cwd: p.packageDirectoryPath,
        stdio: 'inherit'
    });
});
execa.shellSync("rm -Rf " + localTarballDir);
