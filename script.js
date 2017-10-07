var app = angular.module("localStorageApp", ['datatables']);
app.controller("localStorageCtrl", function ($scope, $compile) {
	$scope.app = "Pesquisa";
	//
	var table;
	$scope.total = 0;
	$scope.lsDados = [];
	$scope.dados = {
		nome: "",
		idade: ""
	};
	//
	/**
	 * Grava dados
	 */
	$scope.gravaInfo = function (item) {
		$scope.lsDados.push(item);
		window.localStorage.setItem('lsDados', JSON.stringify($scope.lsDados));
		$scope.reloadPage();
	};
	//
	/**
	 * Carregar dados do LocalStorage
	 */
	$scope.carregaLocalStorage = function () {
		if (localStorage.getItem("lsDados") != null) {
			var values = JSON.parse(window.localStorage.getItem('lsDados'));
			angular.forEach(values, function (item) {
				$scope.lsDados.push(item);
			});
			$scope.total = $scope.lsDados.length;
			//
			if (table != null) {
				table.destroy();
			}

			table = $('#tb-Dados').DataTable({
				"language": {
					"sEmptyTable": "Nenhum registro encontrado",
					"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
					"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
					"sInfoFiltered": "(Filtrados de _MAX_ registros)",
					"sInfoPostFix": "",
					"sInfoThousands": ".",
					"sLengthMenu": "_MENU_ resultados por página",
					"sLoadingRecords": "Carregando...",
					"sProcessing": "Processando...",
					"sZeroRecords": "Nenhum registro encontrado",
					"sSearch": "Pesquisar",
					"oPaginate": {
						"sNext": "Próximo",
						"sPrevious": "Anterior",
						"sFirst": "Primeiro",
						"sLast": "Último"
					},
					"oAria": {
						"sSortAscending": ": Ordenar colunas de forma ascendente",
						"sSortDescending": ": Ordenar colunas de forma descendente"
					}
				},
				"pageLength": 10,
				"dom": 'Bfrtip',
				"buttons": ['copy','csv','excel','pdf','print'],
				"aaData": $scope.lsDados,
				"bAutoWidth": false,
				"bLengthChange": false,
				"order": [[0, "asc"]],
				"aoColumns": [{
					"mData": "nome"
				}, {
					"mData": "idade"
				}],
				"createdRow": function(row, data, dataIndex) {
					$compile(angular.element(row).contents())($scope);
				}
			});
		}
	};
	//
	/**
	 * Limpar todo LocalStorage
	 */
	$scope.limpar = function (){
		localStorage.clear();
		$scope.reloadPage();
	}
	//
	/**
	 * Recarregar páginas
	 */
	$scope.reloadPage = function() {
		window.location.reload(true);
	}
	//
});