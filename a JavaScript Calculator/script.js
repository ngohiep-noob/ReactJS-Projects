class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formula: '', 
            number: '',
            checkDec: false, 
            formulaList: [], 
            result: '0'
        }
        this.handleChange = this.handleChange.bind(this);
        this.setFormula = this.setFormula.bind(this)
    }
    handleChange(value) {
        let checkNum = /[\d\.]/,
            checkSign = /[\+\-x\/]/,
            curFor = this.state.formula,
            curNum = this.state.number;
        let index = this.state.formula.length - 1, str = '';
        if(checkNum.test(value)) {
            //number
            while(checkSign.test(curFor[index]) ) {
                str = curFor[index].concat(str);
                index--;
            }
            if(str) {
                this.state.formulaList.push(str);
            }
            if(typeof this.state.formulaList[0] == 'number' && this.state.formulaList.length == 1) {
                this.state.formulaList.shift();
                this.setState({
                    formula: ''
                })
                curFor = '';
            }
            if(value != '.' || (value == '.' && !this.state.checkDec)){
                    this.setState(() => {
                    if(curNum[0] == '0' && value != '.' && curNum.length == 1) {
                        // document.getElementById('display').innerHTML = document.getElementById('display').innerText.concat(value)
                        return {
                            formula: curFor.substring(0, curFor.length - 1).concat(value),
                            number: value
                        }
                    } else {
                        // document.getElementById('display').innerHTML = curFor.concat(value);
                        return {
                            formula: curFor.concat(value), 
                            number: curNum.concat(value)
                        }
                    }
                })
            }
            
            if(value == '.') {
                this.state.checkDec = true;
            }
            
        } else if((value != 'x' && value != '/') || this.state.formula.length != 0) {
            //sign      
            if(this.state.number) {
                this.state.formulaList.push(parseFloat(this.state.number))
            }
            if(value == '') {
                this.setState({
                    formula: '',
                    number: '', 
                    checkDec: false,
                    formulaList: []
                })
            } else {
                if(!checkSign.test(curFor[curFor.length - 2])
                || !checkSign.test(curFor[curFor.length - 1])){
                    this.setState(() => {
                        if(!checkNum.test(curFor[curFor.length - 1])) {
                            if(value != '-') {
                                // document.getElementById('display').innerHTML = value;
                                return{
                                   formula: curFor.substring(0, curFor.length - 1).concat(value), 
                                   number: '',
                                   checkDec: false
                                } 
                            } else {
                                // document.getElementById('display').innerHTML = value;
                                return{
                                   formula: curFor.concat(value), 
                                   number: '',
                                   checkDec: false
                                }
                            }
                        } else {
                            // document.getElementById('display').innerHTML = value;
                            return {
                                formula: curFor.concat(value), 
                                number: '',
                                checkDec: false
                            }
                        }      
                    })
                }
                else if(curFor[curFor.length - 1] == '-' && value != '-') {
                    // document.getElementById('display').innerHTML = value;
                    this.setState({
                        formula: curFor.substring(0, curFor.length - 2).concat(value), 
                        number: '',
                        checkDec: false
                    })
                }
            }
        }
    }
    setFormula(res) {
        this.setState({
            number: '',
            checkDec: false,
            formulaList: [res],
            result: res.toString()
        })
        this.state.formula = res.toString();

    }
    render() {
        return(
            <div id="calculator">
                <div id="display1">
                    <p id="formular">{this.state.formula ? this.state.formula : '0'}</p>
                    <p id="display">{this.state.number ? this.state.number : this.state.result}</p>
                </div>
                <CalculatorBody onChange={this.handleChange} formulaList={this.state.formulaList} lastNum={this.state.number} setFormula={this.setFormula}/>
            </div>
        )
    }
}

class CalculatorBody extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.HandleEqual = this.HandleEqual.bind(this)
    }
    HandleEqual() {      
        let formulaList = this.props.formulaList,
            i = 0,
            reg = /[x\/]/,
            result = 0;
        console.log(formulaList)

        if(this.props.lastNum) {
            formulaList.push(parseFloat(this.props.lastNum))
        }
        if(formulaList[0] == '-') {
            formulaList.shift();
            formulaList[0] = - formulaList[0];
        }
        while(i < formulaList.length) {
            if(typeof formulaList[i] == 'string') {
                if(formulaList[i].length == 2) {
                    formulaList[i + 1] = -formulaList[i + 1];
                    formulaList[i] = formulaList[i][0];
                }
                if(reg.test(formulaList[i]) && i != 0) {
                    formulaList = [...compute(formulaList, i)]
                    i--;
                }
            }
            i++;
        }
        result = formulaList[0];
        for(let i = 1; i < formulaList.length; i += 2) {
            if(formulaList[i] == '-') {
                result -= formulaList[i + 1]
            } else {
                result += formulaList[i + 1]

            }
        }
        console.log(formulaList)
        if(result % 1 !== 0 && result.toString().length >= 6) {
            result = result.toFixed(6);
        }
        this.props.setFormula(result);
        document.getElementById('display').innerHTML = result;
        function compute(list, i) {
            switch(list[i]) {
                case '/':
                    return list.slice(0, i - 1).concat(list[i - 1] / list[i + 1]) .concat(list.slice(i + 2))
                case 'x':
                    return list.slice(0, i - 1).concat(list[i - 1] * list[i + 1]) .concat(list.slice(i + 2))
            }
        }
    }
    handleClick(e) {
        if(e.target.innerHTML == 'AC') {
            this.props.onChange('')
            document.getElementById('display').innerHTML = 0;
        } else {
            this.props.onChange(e.target.innerHTML)
        }      
    }
    render() {
        return(
            <div id="cal-body">  
                <Btn type='clear' content='AC' onClick={this.handleClick}/>  
                <Btn type='divide' content='/' onClick={this.handleClick}/>  
                <Btn type='multiply' content='x' onClick={this.handleClick}/>  
                <Btn type='seven' content='7' onClick={this.handleClick}/>  
                <Btn type='eight' content='8' onClick={this.handleClick}/>  
                <Btn type='nine' content='9' onClick={this.handleClick}/>  
                <Btn type='subtract' content='-' onClick={this.handleClick}/>  
                <Btn type='four' content='4' onClick={this.handleClick}/>  
                <Btn type='five' content='5' onClick={this.handleClick}/>  
                <Btn type='six' content='6' onClick={this.handleClick}/>  
                <Btn type='add' content='+' onClick={this.handleClick}/>  
                <Btn type='one' content='1' onClick={this.handleClick}/>  
                <Btn type='two' content='2' onClick={this.handleClick}/>  
                <Btn type='three' content='3' onClick={this.handleClick}/>  
                <Btn type='equals' content='=' onClick={this.HandleEqual}/>  
                <Btn type='zero' content='0' onClick={this.handleClick}/>  
                <Btn type='decimal' content='.' onClick={this.handleClick}/>  
            </div>
        )
           
    }
}
class Btn extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <button 
            type="button" 
            className='btn' 
            id={this.props.type}
            onClick={this.props.onClick}
            >{this.props.content}</button>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)