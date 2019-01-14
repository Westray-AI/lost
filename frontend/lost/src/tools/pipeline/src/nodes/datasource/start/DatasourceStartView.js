import BaseNodeView from '../../BaseNodeView'


export default class DatasourceStartView extends BaseNodeView {
    constructor(model: DatasourceRunningModel) {
		super({
			header: {
				icon: 'fa fa-hdd-o',
				title: 'Datasource',
				colorInvalidated: 'warning',
				colorValidated: 'success',
			},
			content: [
				{
					attribute: 'Type',
					value: model.datasource.type,
				},
				{
					attribute: 'Source',
					value: model.state.path.value,
					ref: 'source',
				},
			],
		})
    }
	update(source: String){
		console.log("UPDAT PATH", source)
		this.html.refs['source'].textContent = source
	}
}