function requestHeapData() {
    $.ajax({
        url: 'http://localhost:8080/admin/portal/admin/draft/_/service/com.enonic.app.statuspage/getstatus',
        success: function(statusJSON) {
        	var series = heap.series[0],
                shift = series.data.length > 20; // shift if the series is
            	                                  // longer than 20
            // add the point
            //chart.series[0].addPoint(point, true, shift);
            heap.series[0].addPoint(statusJSON.jvmMemory.heap.init, true, shift);
            //chart.series[1].addPoint(point.heap.max, true, shift);
            heap.series[2].addPoint(statusJSON.jvmMemory.heap.committed, true, shift);
            heap.series[3].addPoint(statusJSON.jvmMemory.heap.used, true, shift);

            // update xAxis label
            //console.log(chart.xAxis.length);

            heap.xAxis[0].categories.push(statusJSON.timeStamp);
            

            // call it again after one second
            setTimeout(requestHeapData, 1000);    
        },
        cache: false
    });
}





function requestNonHeapData() {
    $.ajax({
        url: 'http://localhost:8080/admin/portal/admin/draft/_/service/com.enonic.app.statuspage/getstatus',
        success: function(statusJSON) {
        	var series = nonheap.series[0],
                shift = series.data.length > 20; // shift if the series is
            	                                  // longer than 20
            // add the point
            //chart.series[0].addPoint(point, true, shift);
            nonheap.series[0].addPoint(statusJSON.jvmMemory.heap.init, true, shift);
            //chart.series[1].addPoint(point.heap.max, true, shift);
            nonheap.series[2].addPoint(statusJSON.jvmMemory.heap.committed, true, shift);
            nonheap.series[3].addPoint(statusJSON.jvmMemory.heap.used, true, shift);

            // update xAxis label
            //console.log(chart.xAxis.length);

            nonheap.xAxis[0].categories.push(statusJSON.timeStamp);
            

            // call it again after one second
            setTimeout(requestNonHeapData, 1000);    
        },
        cache: false
    });
}







function previousGetData() {

	var response;

	$.ajax({
		dataType: "json",
		url: 'http://localhost:8080/status',
		method: 'GET',
		success: function (a, b, c) {
			
		}
	});

	return [
    	['init',   268435456],
        //['max',       3817865216],
        ['committed', 490209280],
        ['used',    140141560]
    ]
}







$(function () {
    heap = new Highcharts.Chart({
        chart: {
        	type: 'line',
            renderTo: 'heap',
            defaultSeriesType: 'spline',
            events: {
                load: requestHeapData
            }
        },
        title: {
            text: 'Heap memory'
        },
        xAxis: {
        	categories: [],
            //type: 'datetime',
            tickmarkPlacement: 'on',
            title: {
            	enabled: 'false'
            }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: [{
            name: 'Init',
            data: []
        },
        {
            name: 'Max',
            data: []
        },
        {
            name: 'Committed',
            data: []
        },
        {
            name: 'Used',
            data: []
        }]
    });




    nonheap = new Highcharts.Chart({
        chart: {
        	type: 'line',
            renderTo: 'nonheap',
            defaultSeriesType: 'spline',
            events: {
                load: requestNonHeapData
            }
        },
        title: {
            text: 'Non-Heap memory'
        },
        xAxis: {
        	categories: [],
            //type: 'datetime',
            tickmarkPlacement: 'on',
            title: {
            	enabled: 'false'
            }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: [{
            name: 'Init',
            data: []
        },
        {
            name: 'Max',
            data: []
        },
        {
            name: 'Committed',
            data: []
        },
        {
            name: 'Used',
            data: []
        }]
    });
});