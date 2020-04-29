import React,{Component} from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("colors",
[
	"#003f5c",
	"#f95d6a",
	"#2f4b7c",
	"#ffa600",
	"#00CCFF",
	"#ff7c43",
	"#00CC00",
	"#CCFF66",
]);

class PieChart extends Component {
	render() {
		const {transactions, name, total} = this.props;
        const arr = transactions.map((item)=>{
            const obj = {}
            obj["label"] = item._id;
            obj["y"] = item.totalAmount;
            return obj;
		});
		arr.sort((item1, item2)=>item2.y-item1.y)
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			colorSet:"colors",
			title: {
				text: name
			},
			toolTip: {
				shared:true,
				fontWeight:"bold",
				contentFormatter : function(e){
					for(let i=0;i<e.entries.length;i++)
						return `₹${e.entries[i].dataPoint.y}(${((e.entries[i].dataPoint.y/total)*100).toFixed(2)}%)`;
				}
			},
			data: [{
				type: "pie",
				startAngle: 75,
				radius:100,
				cursor:"pointer",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabelFontWeight: "bold",
				indexLabel: "{label}  ₹{y}",
				dataPoints: [...arr]
			}]
		}
		return (
				<CanvasJSChart options = {options}/>
		);
	}
}

export default PieChart