// import React,{Component} from 'react';
// import CanvasJSReact from '../../assets/canvasjs.react';
// import $ from 'jquery';
// // var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// var totalVisitors = 829500;
 
// var transactionsDrilldownedChartOptions = {
// 	animationEnabled: true,
// 	theme: "light2",
// 	axisY: {
// 		gridThickness: 0,
// 		includeZero: false,
// 		lineThickness: 1
// 	},
// 	data: []
// };
 
// var transactionOptions = {
// 	animationEnabled: true,
// 	theme: "light2",
// 	title: {
// 		text: "Expense vs Income Transactions"
// 	},
// 	subtitles: [{
// 		text: "Click on Transaction to Drilldown",
// 		backgroundColor: "#2eacd1",
// 		fontSize: 16,
// 		fontColor: "white",
// 		padding: 5
// 	}],
// 	legend: {
// 		fontFamily: "calibri",
// 		fontSize: 14,
// 		itemTextFormatter: function (e) {
//             // return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";  
//             return e.dataPoint.name + ": ₹" +e.dataPoint.y
// 		}
// 	},
// 	data: []
// };


// class PieChart extends Component {
// 	constructor() {
// 		super();
// 		this.options = {};
// 		this.transactionsChartDrilldownHandler = this.transactionsChartDrilldownHandler.bind(this);
//         this.handleMouseOut = this.handleMouseOut.bind(this);
//     }

// 	componentDidMount(){
// 		var chart = this.chart;
// 		var options = this.options
// 			chart.options = transactionOptions;
// 			chart.options.data = options["Expense vs Income Transactions"];
// 			chart.render();            
// 		// $("#backButton").click(function() { 
// 		// 	$(this).toggleClass("invisible");
// 		// 	chart.options = transactionOptions;
// 		// 	chart.options.data = options["Expense vs Income Transactions"];
// 		// 	chart.render();
// 		// });
//     }    
    
//     handleMouseOut(e) { 
//         $(this).toggleClass("invisible");
// 		var chart = this.chart;
//         chart.options = transactionOptions;
//         chart.options.data = this.options["Expense vs Income Transactions"];
//         chart.render();
//     };

// 	transactionsChartDrilldownHandler(e) {
// 		var chart = this.chart;
// 		chart.options = transactionsDrilldownedChartOptions;
// 		chart.options.data = this.options[e.dataPoint.name];
// 		chart.options.title = { text: e.dataPoint.name }
// 		chart.render();
// 		// $("#backButton").toggleClass("invisible");
// 	}
	
// 	render() {	
//         const {categoryIncomeTransactions, categoryExpenseTransactions, totalExpense, totalIncome} = this.props;
//         const arr1 = categoryIncomeTransactions.map((item)=>{
//             const obj = {}
//             obj["label"] = item._id;
//             obj["y"] = item.totalAmount;
//             return obj;
//         });
//         const arr2 = categoryExpenseTransactions.map((item)=>{
//             const obj = {}
//             obj["label"] = item._id;
//             obj["y"] = item.totalAmount;
//             return obj;
//         });

// 		this.options = {
// 			"Expense vs Income Transactions": [{
//                 mouseover: this.transactionsChartDrilldownHandler,
//                 click:this.handleMouseOut,
//                 cursor: "pointer",
//                 explodeOnClick: false,
// 				innerRadius: "75%",
// 				legendMarkerType: "square",
// 				name: "Expense vs Income Transactions",
// 				radius: "100%",
// 				showInLegend: true,
// 				startAngle: 90,
// 				type: "pie",
// 				dataPoints: [
// 					{ y: totalIncome, name: "Income Transactions", color: "#50ee81" },
// 					{ y: totalExpense, name: "Expense Transactions", color: "#e72438" }
// 				]
// 			}],
// 			"Income Transactions": [{
//                 name: "Income Transactions",
//                 cursor: "pointer",
//                 type: "pie",
//                 startAngle: 75,
//                 toolTipContent: "<b>{label}</b>: ₹{y}",
//                 showInLegend: "true",
//                 legendText: "{label}",
//                 indexLabelFontSize: 16,
//                 indexLabel: "{label} - ₹{y}",
//                 dataPoints: [
//                     ...arr1
//                 ]
// 			}],
// 			"Expense Transactions": [{
// 				name: "Expense Transactions",
//                 type: "pie",
//                 cursor: "pointer",
//                 startAngle: 75,
//                 toolTipContent: "<b>{label}</b>: ₹{y}",
//                 showInLegend: "true",
//                 legendText: "{label}",
//                 indexLabelFontSize: 16,
//                 indexLabel: "{label} - ₹{y}",
//                 dataPoints: [
//                     ...arr2
//                 ]
// 			}]
// 		}
// 		const buttonStyle={
// 			bordeRadius: '4px',
// 			padding: '8px',
// 			border: 'none',
// 			fontSize: '16px',
// 			backgroundColor: '#2eacd1',
// 			color: 'white',
// 			// position: 'absolute',
// 			// top: '10px',
// 			// right: '10px',
// 			cursor: 'pointer'
// 		}
// 		return (
//  		<div>
// 			<CanvasJSChart options = {this.options} 
// 				 onRef={ref => this.chart = ref}
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 			{/* <button className="btn invisible" id="backButton" style={buttonStyle}>&lt; Back</button> */}
// 		</div>
// 		);
// 	}
// }

// export default PieChart;

// class PieChart extends Component {
// 	render() {
//         const {categoryIncomeTransactions, categoryExpenseTransactions} = this.props;
//         console.log(categoryIncomeTransactions)
//         const arr = categoryIncomeTransactions.map((item)=>{
//             const obj = {}
//             obj["label"] = item._id;
//             obj["y"] = item.totalAmount;
//             return obj;
//         });
// 		const options = {
// 			exportEnabled: true,
// 			animationEnabled: true,
// 			title: {
// 				text: "Income Transactions"
// 			},
// 			data: [{
// 				type: "pie",
// 				startAngle: 75,
// 				toolTipContent: "<b>{label}</b>: ₹{y}",
// 				showInLegend: "true",
// 				legendText: "{label}",
// 				indexLabelFontSize: 16,
// 				indexLabel: "{label} - ₹{y}",
// 				dataPoints: [
//                     ...arr
//                     // { y: 18, label: "Direct" },
// 					// { y: 49, label: "Organic Search" },
// 					// { y: 9, label: "Paid Search" },
// 					// { y: 5, label: "Referral" },
// 					// { y: 19, label: "Social" }
// 				]
// 			}]
// 		}
// 		return (
// 		<div>
// 			<CanvasJSChart options = {options}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }

// export default PieChart