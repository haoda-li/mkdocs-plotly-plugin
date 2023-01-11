from pymdownx.superfences import _escape
from pymdownx.superfences import SuperFencesException, fence_code_format

from mkdocs.exceptions import PluginError

import json

def fence_plotly(source, language, class_name, options, md, **kwargs):
    try:
        data = json.loads(source)
    except Exception:
        return fence_code_format(source, language, class_name, options, md, **kwargs)
    if data.get('file_path'):
        file_path = str(data['file_path'])
        return f'<div class="plotly-chart" data-jsonpath={file_path}></div>'
    return f'<div class="plotly-chart">{_escape(source)}</div>'
