load("//tensorboard/defs:defs.bzl", "tensorboard_webcomponent_library")
load("//tensorboard/defs:web.bzl", "tf_web_library")

package(default_visibility = ["//tensorboard:internal"])

licenses(["notice"])  # Apache 2.0

tf_web_library(
    name = "tf_color_scale",
    srcs = [
        "colorScale.ts",
        "palettes.ts",
        "tf-color-scale.html",
    ],
    path = "/tf-color-scale",
    deps = [
        "//tensorboard/components/tf_backend",
        "//tensorboard/components/tf_imports:d3",
        "//tensorboard/components/tf_imports:polymer",
        "//tensorboard/components/tf_settings_store",
    ],
)

tensorboard_webcomponent_library(
    name = "legacy",
    srcs = [":tf_color_scale"],
    destdir = "tf-color-scale",
    deps = [
        "//tensorboard/components/tf_backend:legacy",
        "//tensorboard/components/tf_imports:polymer_lib",
        "//tensorboard/components/tf_imports_google:lib",
        "//tensorboard/components/tf_settings_store",
    ],
)
