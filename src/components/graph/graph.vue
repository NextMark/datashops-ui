<template>
    <div>
        <div id="graph"></div>
    </div>
</template>

<script>
    import * as d3 from "d3";
    import dagreD3 from "dagre-d3";
    import tippy from "tippy.js";
    import "tippy.js/dist/tippy.css";


    export default {
        name: 'Graph',
        props: ['jobGraph'],
        watch:{
            jobGraph: {
                deep:true,
                handler(val) {
                    this.graph = val
                },
            }
        },

        data() {
            return {
                graph: {}
            }
        },
        methods: {
            render() {
                var g = new dagreD3.graphlib.Graph().setGraph({});
                this.graph.nodes.forEach(function(node) {
                    g.setNode(node.id, { label: node.label });
                    if (node.id.indexOf("error") === -1) {
                        g.node(node.id).style = "fill: #8EE2FF";
                    } else {
                        g.node(node.id).style = "fill: #8EE2FF";
                    }
                });
                this.graph.edges.forEach(function(edge) {
                    g.setEdge(edge.from, edge.to, { label: edge.label });
                });

                g.nodes().forEach(function(v) {
                    var node = g.node(v);
                    node.rx = node.ry = 5;
                });

                var svg = d3
                        .select(this.$el.querySelector("#graph"))
                        .append("svg")
                        .attr("width", document.body.clientWidth - 850)
                        .attr("height", 500),
                    inner = svg.append("g");
                // Set up zoom support
                var zoom = d3.zoom().on("zoom", function() {
                    inner.attr("transform", d3.zoomTransform(svg.node()));
                });
                svg.call(zoom);

                var render = new dagreD3.render();
                render(inner, g);

                inner
                    .selectAll("g.node")
                    .attr("title", function(v) {
                        return "hello world";
                    })
                    .each(function(v) {
                        tippy(this, {
                            content: v,
                            interactive: true,
                            allowHTML: true,
                            appendTo: document.body
                        });
                    });

                var initialScale = 0.85;
                svg.call(
                    zoom.transform,
                    d3.zoomIdentity
                        .translate(
                            (svg.attr("width") - g.graph().width * initialScale) / 2,
                            20
                        )
                        .scale(initialScale)
                );

                svg.attr("height", g.graph().height * 2 + 40);
            }
        },
        mounted() {
            this.graph = this.jobGraph
            console.log(this.graph)
            this.render();
        }
    }
</script>

<style scoped>
    /deep/ svg {
        text-align: center;
        display: block;
        margin: auto;
        border: 1px solid #ccc;
    }

    /deep/ .node rect {
        stroke: #333;
        fill: #fff;
    }

    /deep/ .edgePath path {
        stroke: #333;
        fill: #333;
        stroke-width: 1.5px;
    }
</style>
