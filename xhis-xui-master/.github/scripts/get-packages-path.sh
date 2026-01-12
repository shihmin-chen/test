#!/bin/bash
####
# get package paths in given p
####
set -e

DIR=$1

function f_get_pkg_name() {
    path=$1
    IFS='/' read -ra sub_paths <<< $path
    echo "${sub_paths[-1]}"
}

toUpdatePaths="{\"package_path\":\"packages/xui\",\"package_name\": \"xui\"},"
 
toUpdatePaths="{\"include\":[${toUpdatePaths::-1}]}"
echo $toUpdatePaths
