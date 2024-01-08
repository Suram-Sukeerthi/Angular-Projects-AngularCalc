import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  input: string = '';
  result: string = '';

  pressNum(num: string) {
    //Don not allow . more than once
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }
    //Do not allow 0 beginning.
    // Javascript will throw error of "Octal Literals are not allowed in Strict Mode"
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }
    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operator more than one
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }
    this.input = this.input + op;
    this.calcAnswer();
  }

  pressPercentage() {
    const lastOperand = this.getLastOperand();
    if (!isNaN(parseFloat(lastOperand))) {
      const percentageValue = (parseFloat(lastOperand) * 0.01).toString();
      const pos = this.input.length - lastOperand.length;
      this.input = this.input.slice(0, pos) + percentageValue;
      this.calcAnswer();
    }
  }  

  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  allClear(){
    this.input="";
    this.result="";
  }

  calcAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }
    lastKey = formula[formula.length-1];
    if(lastKey==="/"|| lastKey==="*"||lastKey==="+"||lastKey==="."){
      formula = formula.substr(0,formula.length-1)
    }
    console.log("Formula"+formula);
    this.result=eval(formula);
  }

  getAnswer(){
    this.calcAnswer();
    this.input=this.result;
    if(this.input=="0")
    this.input="";
  }
}
