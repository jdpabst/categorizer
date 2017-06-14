
const CREATE_CHART = "CREATE_CHART"
const SET_ACTIVE_CHART_INDEX = "SET_ACTIVE_CHART_INDEX"
const ADD_DATASET = "ADD_DATASET"

let initialState = {
    activeChartIndex: 0,
    charts: [
        {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            name: "Example Chart",
            datasets: [
                {
                    label: "My First dataset", 
                    data: [65, 59, 90, 81, 56, 55, 40] 
                },
                {
                    label: "My Second dataset",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }
    ]
}

export function addDataset(dataset){
    return {
        dataset,
        type: ADD_DATASET
    }
}
export function setActiveChartIndex(index){
    return{
        index: index,
        type: SET_ACTIVE_CHART_INDEX
    }
}
export function chart(state = initialState, action){
    switch(action.type){
        case CREATE_CHART:
            return {
                activeChartIndex: 0,
// ... - list everything that is already in state.charts // merge whatever action.chart is with state.charts // then it will become the new state.charts
                charts: [ action.chart, ...state.charts ]
            }
        case SET_ACTIVE_CHART_INDEX:
            return {
                activeChartIndex: action.index,
                charts: state.charts
            }
        case ADD_DATASET: {
            const { activeChartIndex, charts } = state;
            const activeChart = state.charts[ state.activeChartIndex ];
                return {
                    activeChartIndex: state.activeChartIndex,
                    charts: [
                    ...state.charts.slice( 0, state.activeChartIndex ),
                    Object.assign({}, activeChart, { datasets: [ ...activeChart.datasets, action.dataset ] }),
                    ...state.charts.slice( state.activeChartIndex + 1, state.charts.length )
                    ]
                }
            }
        default:
            return state;
    }
}

function createChart(labels, name){
    return {
        chart: { labels, name, datasets: [] },
        type: CREATE_CHART
    }
}

export default chart