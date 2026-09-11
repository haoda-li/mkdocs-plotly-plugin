

# Mkdocs Plotly Plugin

__This project is archived due to the [unmaintained Mkdocs and MKdocs for material dependency](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/#why-zensical)__

 For using plotly on zensical, I would recommend use [markdown-exec plugin](https://zensical.org/docs/compatibility/mkdocs/plugins/#markdown-exec). 

````markdown
```python exec="on"

fig = ... # create your plotly fig
fig.update_traces(showscale=False)
fig.update_layout(margin=dict(l=0, r=0, b=0, t=0))
print(fig.to_html(full_html=False, include_plotlyjs="cdn"))
```
````

![PyPI](https://img.shields.io/pypi/v/mkdocs-plotly-plugin)
![PyPI - Downloads](https://img.shields.io/pypi/dm/mkdocs-plotly-plugin)
![PyPI - License](https://img.shields.io/pypi/l/mkdocs-plotly-plugin)

[MkDocs](https://www.mkdocs.org/) plugin to create interactive charts from data using the declarative [plotly](https://plotly.com/javascript/)'s json syntax. 

Includes supports for [mkdocs-material](https://github.com/squidfunk/mkdocs-material) theme features like [instant loading](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/?h=reload#instant-loading) and [dark color themes](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/#color-palette-toggle).

## Installation

Install the plugin using `pip3`:

```shell
pip install mkdocs-plotly-plugin 
```

And then add the plugin into `plugins` and the custome fence

```yml
plugins:
  - plotly

markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: plotly
          class: mkdocs-plotly
          format: !!python/name:mkdocs_plotly_plugin.fences.fence_plotly


```

## Usage

You can insert any valid plotly JSON as a codeblock using:
````
``` plotly
{
    "data": [
        {
            "x": [
                "giraffes",
                "orangutans",
                "monkeys"
            ],
            "y": [
                20,
                14,
                23
            ],
            "type": "bar"
        }
    ]
}
```
````

``` plotly
{
    "data": [
        {
            "x": [
                "giraffes",
                "orangutans",
                "monkeys"
            ],
            "y": [
                20,
                14,
                23
            ],
            "type": "bar"
        }
    ]
}
```

This is compatiable with `snipplets` as well

````
```plotly
;--8<-- "assets/data.json"
```
````

```plotly
--8<-- "assets/data.json"
```


or you can insert any plotly JSON through URLs


````
```plotly
{"file_path": "./assets/data.json"}
```
````

```plotly
{"file_path": "./assets/data.json"}
```
!!!note "Snipplets vs. file path"

    Using `snipplets` will insert the json content into the output HTML file, which is more suitable for smaller datasets. Using `file_path` will fetch the json content once the page is loaded.


!!!note "Plotly JSON"

    Plotly has its own eco-system for creating charts in most statistical languages. You can output the plot as a json file through `fig.to_json()`.

### Options

| Option   | Default | Description                                                            |
| -------- | ------- | ---------------------------------------------------------------------- |
| lib_path | ` `      | Relative path to local `plotly.js` file, or leave it blank to use CDN. |
| template_default   | `plotly_min`  | template for plotly charts in light mode |
| template_slate | `plotly_dark_min`      | template for plotly charts in dark mode |
| enable_template | True | use template to automatically change theme |

!!! note Plotly templates
    Available Plotly templates are `["plotly", "plotly_white", "plotly_dark", "ggplot2", "seaborn", "simple_white", "none"]`. If you want to customize your own template, you can export it as a JSON file and provide its path in options relative to `doc_dir`.
