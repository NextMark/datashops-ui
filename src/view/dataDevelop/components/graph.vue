<template>
    <div>
        <div id="graph"></div>
    </div>
</template>

<script>
    import * as d3 from "d3";
    import dagreD3 from "dagre-d3";

    export default {
        name: 'graph',
        props: ['jobGraph'],
        watch: {
            jobGraph: {
                deep: true,
                handler(val) {
                    this.graph = val
                    this.$nextTick(() => {
                        this.render();
                    });
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
                d3.selectAll("#graph > *").remove();
                var g = new dagreD3.graphlib.Graph().setGraph({});
                this.graph.nodes.forEach(function (node) {
                    node.rx = node.ry = 5;
                    g.setNode(node.id, node);
                    if (node.id.indexOf("error") === -1) {
                        g.node(node.id).style = "fill: #8EE2FF";
                    } else {
                        g.node(node.id).style = "fill: #8EE2FF";
                    }
                });
                this.graph.edges.forEach(function (edge) {
                    g.setEdge(edge.from, edge.to, {label: edge.label});
                });

                var svg = d3
                        .select(this.$el.querySelector("#graph"))
                        .append("svg")
                        .attr("width", document.body.clientWidth - 850)
                        .attr("height", document.body.clientHeight - 150),
                    inner = svg.append("g");
                // Set up zoom support  d3.zoomTransform(svg.node())
                var zoom = d3.zoom().on("zoom", function () {
                    inner.attr("transform", d3.event.transform);
                });
                svg.call(zoom);

                var render = new dagreD3.render();
                render(inner, g);

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

                //svg.attr("height", g.graph().height * 2 + 40);
            }
        },
        created() {
            console.log('ss')
            this.graph = this.jobGraph
            this.$nextTick(() => {
                this.render()
            });
            //this.render();
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
