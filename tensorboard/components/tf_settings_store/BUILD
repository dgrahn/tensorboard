load("//tensorboard/defs:web.bzl", "tf_web_library")

package(default_visibility = ["//tensorboard:internal"])

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "tf_settings_store",
    srcs = [
        "settingsStore.ts",
        "tf-settings-store.html",
    ],
    path = "/tf-settings-store",
    deps = [
        "//tensorboard/components/tf_imports:polymer",
        "//tensorboard/components/tf_storage",
    ],
)
