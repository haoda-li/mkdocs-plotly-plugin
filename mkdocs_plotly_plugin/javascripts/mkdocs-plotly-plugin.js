'use strict'

const plotlyCharts = document.querySelectorAll("div.plotly-chart");
const bodyelement = document.querySelector('body');

const defaultTemplate = document.querySelector("#default-template-settings");
const slateTemplate = document.querySelector("#slate-template-settings");

const defaultTemlateSettings = defaultTemplate ? JSON.parse(defaultTemplate.textContent) : null;
const slateTemplateSettings = slateTemplate ? JSON.parse(slateTemplate.textContent) : null;


function updateTemplate() {
    if (bodyelement.getAttribute('data-md-color-scheme') == 'slate') {
        plotlyCharts.forEach(div => {
            if (div.dataset.load)
                Plotly.relayout(div, slateTemplateSettings)
        });
    } else { 
        plotlyCharts.forEach(div => {
            if (div.dataset.load)
                Plotly.relayout(div, defaultTemlateSettings)
        });
    }
}

if (slateTemplateSettings && defaultTemlateSettings) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "attributes") {
                if (mutation.attributeName == "data-md-color-scheme") {
                    updateTemplate();
                }
            }
        });
    });
    observer.observe(bodyelement, {
        attributes: true //configure it to listen to attribute changes
    });
}


async function fetchData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

plotlyCharts.forEach(div => {
    if (div.dataset.jsonpath)
        fetchData(div.dataset.jsonpath).then(
            plot_data => {
                const data = plot_data.data ? plot_data.data : {};
                const layout = plot_data.layout ? plot_data.layout : {};
                const config = plot_data.config ? plot_data.config : {};
                Plotly.newPlot(div, data, layout, config);
                div.dataset.load = true;
                if (slateTemplateSettings && defaultTemlateSettings)
                    updateTemplate();
            }
        )
    else {
        const plot_data = JSON.parse(div.textContent);
        div.textContent = '';
        const data = plot_data.data ? plot_data.data : {};
        const layout = plot_data.layout ? plot_data.layout : {};
        const config = plot_data.config ? plot_data.config : {};
        Plotly.newPlot(div, data, layout, config);
        div.dataset.load = true;
        if (slateTemplateSettings && defaultTemlateSettings)
            updateTemplate();
    }
})



