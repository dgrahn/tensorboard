load("@npm_angular_bazel//:index.bzl", "ng_module")
load("//tensorboard/defs:defs.bzl", "tf_ts_library")

package(default_visibility = ["//tensorboard:internal"])

licenses(["notice"])  # Apache 2.0

ng_module(
    name = "graph_executions",
    srcs = [
        "graph_executions_component.ts",
        "graph_executions_container.ts",
        "graph_executions_module.ts",
    ],
    assets = [
        "graph_executions_component.css",
        "graph_executions_component.ng.html",
    ],
    deps = [
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/actions",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/store",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/store:debug_tensor_value",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/store:types",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/debug_tensor_value",
        "//tensorboard/webapp/angular:expect_angular_cdk_scrolling",
        "@npm//@angular/common",
        "@npm//@angular/core",
        "@npm//@ngrx/store",
        "@npm//rxjs",
    ],
)

tf_ts_library(
    name = "graph_executions_container_test_lib",
    testonly = True,
    srcs = [
        "graph_executions_container_test.ts",
    ],
    tsconfig = "//:tsconfig-test",
    deps = [
        ":graph_executions",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin:debugger_v2",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/actions",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/store",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/store:types",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/testing",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/alerts",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/debug_tensor_value",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/execution_data",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/inactive",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/source_files",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/stack_trace",
        "//tensorboard/plugins/debugger_v2/tf_debugger_v2_plugin/views/timeline",
        "//tensorboard/webapp/angular:expect_angular_cdk_scrolling",
        "//tensorboard/webapp/angular:expect_angular_core_testing",
        "//tensorboard/webapp/angular:expect_ngrx_store_testing",
        "@npm//@angular/common",
        "@npm//@angular/compiler",
        "@npm//@angular/core",
        "@npm//@angular/platform-browser",
        "@npm//@ngrx/store",
        "@npm//@types/jasmine",
    ],
)
