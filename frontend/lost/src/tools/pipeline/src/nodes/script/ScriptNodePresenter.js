import BaseNodePresenter from '../BaseNodePresenter'

import ScriptNodeModel from './ScriptNodeModel'
import NormalRunningView from './ScriptNormalRunningView'
import NormalStartView from './ScriptNormalStartView'
import ScriptRunningModal from './ScriptRunningModal'
import ScriptStartModal from './ScriptStartModal'


export default class ScriptNodePresenter extends BaseNodePresenter {
    constructor(graph, data, mode) {
		let model = new ScriptNodeModel(data, mode)
		let view = undefined
		let modal = undefined
		if(mode === 'start'){
			view = new NormalStartView(model)
			modal = new ScriptStartModal(model)
		}
		if(mode === 'running'){
			view = new NormalRunningView(model)
			modal = new ScriptRunningModal(model)
		}
        super({ graph, model, view, modal })
    }

    /**
     * @override
     */
    initViewBinding(){
		// add collapse functionallity.
		$(this.modal.html.refs['more-information-link']).on('click', () => {
			$(this.modal.html.refs['collapse-this']).collapse('toggle')
			$(this.modal.html.refs['more-information-icon']).toggleClass('fa-chevron-down fa-chevron-up')
		})
	}
    
	/**
     * @override
     */
    initModelBinding(){
		if(this.model.mode === 'running'){
            this.model.progress.on('update', number => {
                this.view.parentNode.querySelector(`[data-ref='progress-bar']`).style.width = `${number}%`
                this.view.parentNode.querySelector(`[data-ref='progress-bar-text']`).textContent = `${number}%`
            })
            this.model.state.on('update', text => {
                this.view.parentNode.querySelector(`[data-ref='state']`).setAttribute('class', `panel-footer 
                    ${ text === 'script_error' ? 'bg-red' : ''}
                    ${ text === 'pending' ? 'bg-blue' : ''}
                    ${ text === 'in_progress' ? 'bg-orange' : ''}
                    ${ text === 'finished' ? 'bg-green' : ''}`)
                this.view.parentNode.querySelector(`[data-ref='state-text']`).textContent = text.replace('_', ' ')
            })
            this.model.progress.on('update', number => {
                this.modal.html.refs['progress-bar'].style.width = `${number}%`
                this.modal.html.refs['progress-bar-text'].textContent = `${number ? number : 0}%`
            })
            this.model.errorMsg.on('update', text => {
                if (text !== null) {
                    this.modal.html.refs['error-msg'].style.display = 'block'
                    this.modal.html.refs['error-msg-text'].textContent = text
                }
                else {
                    this.modal.html.refs['error-msg'].style.display = 'none'
                    this.modal.html.refs['error-msg-text'].textContent = ''
                }
            })
            this.model.state.on('update', text => {
                this.modal.html.refs['state'].textContent = text
            })
		}
    }
}




