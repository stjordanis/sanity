import React, {Component} from 'react'
import PropTypes from 'prop-types'
import tools from 'all:part:@sanity/base/tool'
import ErrorScreen from './ErrorScreen'

export default class RenderTool extends Component {
  static propTypes = {
    tool: PropTypes.string
  }

  static defaultProps = {
    tool: null
  }

  state = {error: null, showErrorDetails: __DEV__}

  componentDidCatch(error, info) {
    this.setState({error: {error, info}})
  }

  handleShowDetails = () => {
    this.setState({showErrorDetails: true})
  }

  handleRetry = () => {
    this.setState({error: null})
  }

  getActiveTool() {
    const activeToolName = this.props.tool
    const activeTool = tools.find(tool => tool.name === activeToolName)
    return activeTool
  }

  render() {
    if (this.state.error) {
      const {error, info} = this.state.error
      const {showErrorDetails} = this.state

      return (
        <ErrorScreen
          activeTool={this.getActiveTool()}
          error={error}
          info={info}
          onRetry={this.handleRetry}
          onShowDetails={this.handleShowDetails}
          showErrorDetails={showErrorDetails}
        />
      )
    }

    if (!tools.length) {
      return (
        <div>
          No tools fulfills the part <code>`part:@sanity/base/tool`</code>
        </div>
      )
    }

    const activeTool = this.getActiveTool()
    if (!activeTool) {
      return <div>Tool not found: {this.props.tool}</div>
    }

    const ActiveTool = activeTool.component
    return <ActiveTool {...this.props} />
  }
}
