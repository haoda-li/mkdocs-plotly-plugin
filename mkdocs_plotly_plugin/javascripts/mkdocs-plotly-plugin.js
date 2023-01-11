'use strict'


const plotlyCharts = document.querySelectorAll("div.plotly-chart")
let defaultTemplate, slateTemplate;

const templateDOM = document.querySelector("#template-json")
fetchData(templateDOM.dataset.default).then(data => {
    defaultTemplate = data;
}).then(() => {
    fetchData(templateDOM.dataset.slate).then(data => {
        slateTemplate = data;
        updateTemplate();
    });

});

async function fetchData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

function updateTemplate() {
    if (bodyelement.getAttribute('data-md-color-scheme') == 'slate') {
        plotlyCharts.forEach(div => Plotly.relayout(div, slateTemplate));
    } else {
        plotlyCharts.forEach(div => Plotly.relayout(div, defaultTemplate));
    }
}

plotlyCharts.forEach(div => {
    if (div.dataset.jsonpath)
        fetchData(div.dataset.jsonpath).then(
            plot_data => {
                const data = plot_data.data ? plot_data.data : {};
                const layout = plot_data.layout ? plot_data.layout : {};
                const config = plot_data.config ? plot_data.config : {};
                Plotly.newPlot(div, data, layout, config);
            }
        )
    else {
        const plot_data = JSON.parse(div.textContent);
        div.textContent = '';
        const data = plot_data.data ? plot_data.data : {};
        const layout = plot_data.layout ? plot_data.layout : {};
        const config = plot_data.config ? plot_data.config : {};
        Plotly.newPlot(div, data, layout, config);
    }
})

// mkdocs-material has a dark mode including a toggle
// We should watch when dark mode changes and update charts accordingly

const bodyelement = document.querySelector('body');
const observer = new MutationObserver(mutations => {
    if (!slateTemplate) {
        return;
    }
    mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
            if (mutation.attributeName == "data-md-color-scheme") {
                if (bodyelement.getAttribute('data-md-color-scheme') == 'slate') {
                    plotlyCharts.forEach(div => Plotly.relayout(div, slateTemplate))
                } else {
                    plotlyCharts.forEach(div => Plotly.relayout(div, defaultTemplate))
                }
            }
        }
    });
});
observer.observe(bodyelement, {
    attributes: true //configure it to listen to attribute changes
});


