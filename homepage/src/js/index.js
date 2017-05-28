/**
 * Created by Administrator on 2017/5/27 0027.
 */
app.config(function(alldata,$stateProvider,$urlRouterProvider){
    alldata.fstdata.forEach(function(i){
        $stateProvider
            .state({
               name: i.route,
               url:'/'+ i.route,
               templateUrl:"./aside.html",
               controller:function($scope,$stateParams,alldata){
                   var newdata=alldata.secdata.filter(function(i){
                       return i.parentid==$stateParams.self.id
                   })
                   $scope.data=newdata;
                   $scope.parentName=$stateParams.self.name
                   $scope.statueCon=false;
                   $scope.statueConFn=function(){
                       $scope.statueCon=!$scope.statueCon
                       console.log( $scope.statueCon);
                   }
               },
                params:{
                    self:i
                }
            })
    })
    alldata.secdata.forEach(function(i){
        $stateProvider
            .state({
                name: i.route,
                url:'/'+ i.route,
                templateUrl:"./"+ i.enName+".html",
                controller:function($scope,$stateParams,alldata,pre,fenpage,$filter) {
                    var cutfn = function(){
                            $scope.data = alldata.thirdata
                            $scope.fileData = function () {
                                return $filter('filter')($scope.data,{role: $scope.selectedpart, state: $scope.selectedstate})
                            }
                            console.log($scope.fileData())
                            $scope.tabcon = alldata.thirdata;
                            // 每一页显示的数据长度
                            $scope.maxLength = 1
                            fenpage($scope);

                            $scope.search = function () {
                                console.log($scope.roleName)
                                console.log($scope.statues)
                                $scope.pageShow(1)
                            }
                            //修改
                            $scope.bol = false;
                            $scope.alter = function (index) {
                                $scope.bol = true;
                                $scope.tar = {};
                                $scope.tabcon.forEach(function (v, i) {
                                    for (k in v) {
                                        if (index == v.ID) {
                                            $scope.tar[k] = v[k]
                                        }
                                    }
                                })
                                console.log($scope.tar)
                                fenpage($scope);
                            }
                            $scope.sure = function () {
                                $scope.bol = false;
                                $scope.tabcon.forEach(function (v, i) {
                                    if (v.ID == $scope.tar.ID) {
                                        $scope.tabcon[i] = $scope.tar;
                                    }
                                })
                                fenpage($scope);
                            }
                            $scope.fal = function () {
                                $scope.bol = false;
                            }

                            $scope.pop = false;
                            $scope.flag = true;
                            //删除
                            $scope.remove = function (item) {
                                $scope.pop = true;
                                //确定的执行方法
                                $scope.okFn = function () {
                                    var indexPage;
                                    $scope.fileData().forEach(function (i, index) {
                                        switch (i.ID) {
                                            case item.ID:
                                            {
                                                indexPage = Math.ceil(index / $scope.maxLength)
                                            }
                                        }
                                    })
                                    //在原始数据上进行剪切
                                    $scope.tabcon.forEach(function (i, index) {
                                        switch (i.ID) {
                                            case item.ID:
                                            {
                                                $scope.tabcon.splice(index, 1)
                                            }
                                        }
                                    })
                                    $scope.pageShow(indexPage)
                                    $scope.pop = false;
                                }
                                if ($scope.tabcon.length <= 1) {
                                    $scope.flag = false;
                                }
                                //取消执行的方法
                                $scope.noFn = function () {
                                    $scope.pop = false;
                                }
                            }
                        }
                        switch (i.id){
                            case 22:{
                                //角色管理
                                cutfn()
                            }break;
                            case 23:{
                                $scope.data=alldata.thirdata
                                var num=8
                                $scope.arr={};
                                $scope.add=function(){
                                    $scope.arr.ID=++num;
                                    alldata.thirdata.push($scope.arr);
                                    cutfn();
                                }
                            }break;
                        }
                        },
                        resolve:{
                            pre:function($q, $http, $stateParams) {
                                console.log($stateParams.id)
                            }
                        },
                        params:{
                            id:""
                        }
            })
    })
})