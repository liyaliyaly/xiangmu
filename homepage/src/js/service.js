/**
 * Created by Administrator on 2017/5/27 0027.
 */
app.directive('headers',function(){
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"./head.html",
        controller:function($scope,alldata){
            $scope.data=alldata.fstdata
        }
    }
})
app.directive("confirm",function(){
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"./confirm.html"
    }
})
app.service('fenpage',function(){
    return function ($scope) {
        $scope.pageShow=function (i) {
            var oldData=$scope.fileData()
            $scope.allPage=Math.ceil(oldData.length/$scope.maxLength)
            $scope.pageArr=[]
            for(var j=2;j<$scope.allPage;j++){
                $scope.pageArr.push(j)
            }
            $scope.index=i-1
            $scope.showStatue1=false;
            $scope.showStatue2=false;
            if($scope.index<=3){
                $scope.showStatue1=false;
                $scope.showStatue2=true;
                $scope.self=1;
                $scope.self_1=2;
                $scope.self_2=3;
                $scope.self1=4;
                $scope.self2=5;
            }else if($scope.index>3&&$scope.index<$scope.allPage-4){
                $scope.showStatue1=true;
                $scope.showStatue2=true;
                $scope.self=$scope.index+1;
                $scope.self_1=$scope.index;
                $scope.self_2=$scope.index-1;
                $scope.self1=$scope.index+2;
                $scope.self2=$scope.index+3;
            }else{
                $scope.showStatue1=true;
                $scope.showStatue2=false;
                $scope.self=$scope.allPage-1;
                $scope.self_1=$scope.allPage-2;
                $scope.self_2=$scope.allPage-3;
                $scope.self1=$scope.allPage-4;
            }
            if($scope.allPage<=6){
                $scope.showStatue1=false;
                $scope.showStatue2=false;
            }
            $scope.valueDATA=i;
            $scope.cutDataFn()
        }

        $scope.cutDataFn=function () {
            var newdata=$scope.fileData()
            $scope.cutoutData=newdata.splice($scope.index*$scope.maxLength,$scope.maxLength)
        }
        $scope.changeIndexFn=function (i) {
            $scope.pageShow(i)

        }
        $scope.updownFn=function (i) {
            if(i=="+"){
                if(($scope.index+1)< $scope.allPage){
                    $scope.pageShow($scope.index+2)
                }
            }else{
                if($scope.index>0){
                    $scope.pageShow($scope.index)
                }
            }
        }
        $scope.changeInput=function () {
            $scope.pageShow($scope.valueDATA)
        }
        $scope.pageShow(1);
    }
})