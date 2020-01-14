mainApp.controller("dashboardCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers) {
    //Variable


    $scope.currentUser = {};
    //    ========================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }


        // console.log(JSON.stringify($scope.currentUser));

        // APi Daily
        var apiUrlDaily = "/api/dashboard/getDaily";
        HttpRequest.get(apiUrlDaily).success(function (response) {
            $scope.dataDaily = response.items;
            console.log(JSON.stringify($scope.dataDaily));
            // Create the chart
            Highcharts.chart('chartDaily', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Grafik Daily'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: $scope.dataDaily
                }]
            });

        })

        // APi Weekly
        var apiUrlDaily = "/api/dashboard/getWeekly";
        HttpRequest.get(apiUrlDaily).success(function (response) {
            $scope.dataWeekly = response.items;
            console.log(JSON.stringify($scope.dataDaily));
            // Weekly
            Highcharts.chart('chartWeekly', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Grafik Weekly'
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Yang Makan'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{
                    name: "Browsers",
                    colorByPoint: true,
                    data: $scope.dataWeekly
                }]

            });


        })




        // Monthly
        Highcharts.chart('chartMonthly', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Grafik Monthly'
            },
            subtitle: {
                text: ''
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Jumlah Yang Makan'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [{
                name: "Browsers",
                colorByPoint: true,
                data: [{
                        name: "Employee",
                        y: 0,
                        drilldown: "Employee"
                    },
                    {
                        name: "Third Party",
                        y: 0,
                        drilldown: "Third Party"
                    },
                    {
                        name: "Visitor",
                        y: 0,
                        drilldown: "Visitor"
                    }
                ]
            }]

        });

        // Yearly
        Highcharts.chart('chartYearly', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Grafik Yearly'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                        name: "Employee",
                        y: 0,
                        drilldown: "Employee"
                    },
                    {
                        name: "Third Party",
                        y: 0,
                        drilldown: "Third Party"
                    },
                    {
                        name: "Visitor",
                        y: 0,
                        drilldown: "Visitor"
                    }
                ]
            }]
        });

    }

    $scope.listBulan = [{
            id: 01,
            bulan: "Januari"
        },
        {
            id: 02,
            bulan: "Februari"
        },
        {
            id: 03,
            bulan: "Maret"
        },
        {
            id: 04,
            bulan: "April"
        },
        {
            id: 05,
            bulan: "Mei"
        },
        {
            id: 06,
            bulan: "Juni"
        },
        {
            id: 07,
            bulan: "Juli"
        },
        {
            id: 08,
            bulan: "Agustus"
        },
        {
            id: 09,
            bulan: "September"
        },
        {
            id: 10,
            bulan: "Oktober"
        },
        {
            id: 11,
            bulan: "November"
        },
        {
            id: 12,
            bulan: "Desember"
        }
    ]

    $scope.getMonthly = function (bulan) {
        $scope.date = new Date();
        var year = $scope.date.getFullYear();
        var apiBulan = "/api/dashboard/getMonthly?month=" + bulan + "&year=" + year;
        console.log(apiBulan);

        HttpRequest.get(apiBulan).success(function (response) {
            $scope.dataMonthly = response.items;
            console.log(JSON.stringify(response));


            // Monthly
            Highcharts.chart('chartMonthly', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Grafik Monthly'
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Yang Makan'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: $scope.dataMonthly
                }]

            });

        })
    }

    $scope.getYearly = function (tahun) {
        var apiUrl = "/api/dashboard/getYearly?year=" + tahun;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.dataYearly = response.items;
            console.log(JSON.stringify($scope.dataYearly));

            // Yearly
            Highcharts.chart('chartYearly', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Grafik Yearly'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: $scope.dataYearly
                }]
            });
        })
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})