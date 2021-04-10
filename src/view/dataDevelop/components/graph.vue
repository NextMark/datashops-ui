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
                    d3.selectAll("#graph > *").remove();
                    if (JSON.stringify(val) !== '{}') {
                        this.graph = val
                        this.$nextTick(() => {
                            console.log(val)
                            this.render(val);
                        });
                    }
                },
            }
        },

        data() {
            return {
                graph: {}
            }
        },
        methods: {
            render(val) {
                //d3.selectAll("#graph > *").remove();
                var g = new dagreD3.graphlib.Graph().setGraph({});
                val.nodes.forEach(function (node) {
                    g.setNode(node.id, {
                        id: node.id,
                        label: node.label,
                        class: 'type-normal',
                        width: 150,
                        rx: 5,
                        ry: 5,
                    });
                });
                val.edges.forEach(function (edge) {
                    g.setEdge(edge.from, edge.to, {label: edge.label ? edge.label : ''});
                });

                var svg = d3
                        .select(this.$el.querySelector("#graph"))
                        .append("svg")
                        .attr("width", document.body.clientWidth - 850)
                        .attr("height", '80vh'),
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
                            80
                        )
                        .scale(initialScale)
                );

                //svg.attr("height", g.graph().height * 2 + 40);
            }
        },
        mounted() {
            // this.graph = this.jobGraph
            // this.$nextTick(() => {
            //     console.log(this.jobGraph)
            //     this.render(this.jobGraph)
            // });
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

    /deep/ .node text {
        font-weight: 400;
        font-size: 14px;
        pointer-events: none;
        text-anchor: middle;
        /*fill: white;*/
    }
    /deep/ .node rect {
        fill: white;
        stroke-width: 1px;
        color: white;
    }
    /deep/ .label g {
        transform: translate(0, -13px);
    }

    /deep/ .label g text tspan:last-child {
        font-size: 12px;
        margin-top: 15px;
    }

    /deep/ .edgePath path {
        stroke: rgb(78, 78, 78);
        stroke-width: 1px;
    }

    /deep/ g.type-init>rect {
        fill: rgba(0, 91, 252, 0.4);
    }

    /deep/ g.type-ready>rect {
        fill: rgba(0, 91, 252, 0.6);
    }

    /deep/ g.type-queue>rect {
        fill: #999999;
    }

    /deep/ g.type-run>rect {
        fill: #d5eeff;
    }

    /deep/ g.type-normal>rect {
        fill: #d5eeff;
    }

    /deep/ g.type-suss>rect {
        fill: #3EBB44;
    }

    /deep/ g.type-fail>rect {
        fill: #E93A3A;

    }

    /deep/ g.type-freeze>rect {
        fill: #f2f3f7;
    }

    /deep/ .type-freeze text {
        fill: #999999;
    }
</style>
