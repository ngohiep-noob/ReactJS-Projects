marked.setOptions({
    breaks: true
});


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeView = this.handleChangeView.bind(this)
    }
    state = {
        text: placeHolder,
        checker: false,
        textButton: 'Hide Editor'
    }
    
    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleChangeView = (e) => {
        var editor = document.getElementById("editor-box"),
            previewer = document.getElementById("previewer-box");

        this.setState({
            checker: !this.state.checker
        })
        if(!this.state.checker) {
            this.setState({
                textButton: 'Show Editor'
            })

            editor.style.opacity = '0';
            window.setTimeout(
            function hidethis()
            {
                editor.style.display='none';
                previewer.classList.remove('col-6')
                previewer.classList.add('col-12')
            }, 500);

        } else {
            this.setState({
                textButton: 'Hide Editor'
            })
            editor.style.opacity = '1';
            window.setTimeout(
            function showthis()
            {
                editor.style.display='block';
                previewer.classList.remove('col-12')
                previewer.classList.add('col-6')
            }, 300);

        }
    }
    render() {
        const { text, textButton } = this.state;
        const markdown = marked(text);

        return(
            <div>
                <h1 className="text-center pt-2 pb-2 sticky-top w-100">Markdown Previewer</h1>
                <div className='container'>
                    <div className="row mt-4 justify-content-around">

                        {/* Editor */}
                        <Editor onChange={this.handleChange} text={text}/>

                        {/* Previewer */}
                        <Previewer markdown={markdown} />

                    </div>
                        {/* Viewchange button */}
                        <button id='button-view-change' onClick={this.handleChangeView}>{textButton}</button>
                </div>

            </div>
        )
    }
}
const placeHolder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`
class Editor extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className="col-4 rounded" id='editor-box'>
                        <div className='container' id='toolbar'>
                            <i class="fab fa-free-code-camp icon"></i>
                            <h5>Editor</h5>
                            {/* <i className="fas fa-expand-arrows-alt icon"></i> */}
                        </div>
                        <textarea id='editor' className="from-control p-3 rounded" onChange={this.props.onChange} value={this.props.text}></textarea>
            </div>
        )
    }

}

class Previewer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-6 rounded" id='previewer-box' >
                            <div className='container' id='toolbar'>
                                <i class="fab fa-free-code-camp icon"></i>
                                <h5>Previewer</h5>        
                            </div>
                            <div className='preview p-3 rounded' dangerouslySetInnerHTML={{__html: this.props.markdown}} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

