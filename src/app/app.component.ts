import { Component, NgModule, OnInit } from '@angular/core';
import { CategoriesEnum, QuestionTypesEnum } from './enums';
import { ICategory, IPersonalityTest, IQuestion } from './interfaces';
import { FormBuilder, FormControl } from '@angular/forms';
import { TestService } from 'src/services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/starter.css']
})

export class AppComponent implements OnInit {
  title = 'Personality Test';
  personality_questions_json : string ="";
  questions_json : IPersonalityTest = {} as IPersonalityTest;
  category : ICategory[];
  tempCategory : ICategory;
  qtype = QuestionTypesEnum ;
  indexofquestion : number = 0;
  indexofcategory : number = 0;
  answers : IQuestion[]=[];

  surveyForm = this.formBuilder.group({
    q1: '',
    q2: '',
    q3: '',
    q4: {value: '', disabled: true},
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
    q18: '',
    q19: '',
    q20: '',
    q21: '',
    q22: '',
    q23: '',
    q24: '',
    q25: '',  
    q26: ''              
  });
  
  constructor(private formBuilder: FormBuilder, public testService:TestService) {
    this.category = [];
    this.tempCategory = {} as ICategory;
  }

  ngOnInit(): void {
    
    this.personality_questions_json =
      "{\r\n    \"categories\": [\r\n        \"hard_fact\",\r\n        \"lifestyle\",\r\n        \"introversion\",\r\n        \"passion\"\r\n    ],\r\n    \"questions\": [\r\n        {\r\n            \"id\": 1,\r\n            \"question\": \"What is your gender?\",\r\n            \"category\": \"hard_fact\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"male\",\r\n                    \"female\",\r\n                    \"other\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 2,\r\n            \"question\": \"How important is the gender of your partner?\",\r\n            \"category\": \"hard_fact\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"not important\",\r\n                    \"important\",\r\n                    \"very important\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 3,\r\n            \"question\": \"How important is the age of your partner to you?\",\r\n            \"category\": \"hard_fact\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice_conditional\",\r\n                \"options\": [\r\n                    \"not important\",\r\n                    \"important\",\r\n                    \"very important\"\r\n                ]\r\n            },\r\n            \"child_question\": 4,\r\n            \"child_visibility_condition\": \"very important\"            \r\n        },\r\n        {\r\n            \"id\": 4,\r\n            \"question\": \"What age should your potential partner be?\",\r\n            \"category\": \"hard_fact\",\r\n            \"question_type\": {\r\n                \"type\": \"number_range\",\r\n                \"range\": {\r\n                    \"from\": 18,\r\n                    \"to\": 140\r\n                }\r\n            }\r\n        },\r\n        {\r\n            \"id\": 5,\r\n            \"question\": \"Do any children under the age of 18 live with you?\",\r\n            \"category\": \"hard_fact\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"yes\",\r\n                    \"sometimes\",\r\n                    \"no\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 6,\r\n            \"question\": \"How should your potential partner respond to this question?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"yes\",\r\n                    \"sometimes\",\r\n                    \"no\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 7,\r\n            \"question\": \"Could you imagine having children with your potential partner?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"yes\",\r\n                    \"maybe\",\r\n                    \"no\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 8,\r\n            \"question\": \"How should your potential partner respond to this question?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"yes\",\r\n                    \"maybe\",\r\n                    \"no\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 9,\r\n            \"question\": \"What is your marital status?\",\r\n            \"category\": \"hard_fact\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"never married\",\r\n                    \"separated\",\r\n                    \"divorced\",\r\n                    \"widowed\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 10,\r\n            \"question\": \"How often do your drink alcohol?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"never\",\r\n                    \"once or twice a year\",\r\n                    \"once or twice a month\",\r\n                    \"once or twice a week\",\r\n                    \"I'm drinking my 3rd mojito now, and it's only 11am\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 11,\r\n            \"question\": \"How often do you smoke?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"never\",\r\n                    \"once or twice a year\",\r\n                    \"socially\",\r\n                    \"frequently\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 12,\r\n            \"question\": \"What is your attitude towards drugs?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"I'm completely opposed\",\r\n                    \"I've been know to dabble\",\r\n                    \"drugs enrich my life\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 13,\r\n            \"question\": \"You are looking for...\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"friendship\",\r\n                    \"a hot date\",\r\n                    \"an affair\",\r\n                    \"a short-term relationship\",\r\n                    \"a long-term relationship\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 14,\r\n            \"question\": \"Would you like to get married?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"yes\",\r\n                    \"probably\",\r\n                    \"eventually\",\r\n                    \"no\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 15,\r\n            \"question\": \"What is your ideal living arrangement?\",\r\n            \"category\": \"lifestyle\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"cohabitation\",\r\n                    \"separate flat \/ room in the same building\",\r\n                    \"separate flats in the same area\",\r\n                    \"weekend-relationship\",\r\n                    \"long distance relationship\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 16,\r\n            \"question\": \"Do you enjoy spending time alone?\",\r\n            \"category\": \"introversion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"most of the time\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"not at all\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 17,\r\n            \"question\": \"When you're alone, do you get lonely quickly?\",\r\n            \"category\": \"introversion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"most of the time\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"not at all\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 18,\r\n            \"question\": \"Do you enjoy going on holiday by yourself?\",\r\n            \"category\": \"introversion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"most of the time\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"not at all\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 19,\r\n            \"question\": \"I consciously take \\\"me time\\\"\",\r\n            \"category\": \"introversion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"most of the time\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"not at all\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 20,\r\n            \"question\": \"Should one keep little secrets from one's partner?\",\r\n            \"category\": \"introversion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"most of the time\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"not at all\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 21,\r\n            \"question\": \"How often do you think about sex?\",\r\n            \"category\": \"passion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"a few times a day\",\r\n                    \"daily\",\r\n                    \"a few times a week\",\r\n                    \"a few times a month\",\r\n                    \"rarely\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 22,\r\n            \"question\": \"If you were alone on a desert island, how long would you last before pleasuring yourself?\",\r\n            \"category\": \"passion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"less than a day\",\r\n                    \"one day\",\r\n                    \"one week\",\r\n                    \"one month\",\r\n                    \"I'd never do something like that\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 23,\r\n            \"question\": \"How often would you like to have sex with your prospective partner?\",\r\n            \"category\": \"passion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"every day\",\r\n                    \"a few times a week\",\r\n                    \"once a week\",\r\n                    \"every two weeks\",\r\n                    \"infrequently\",\r\n                    \"rarely\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 24,\r\n            \"question\": \"Do you like trying out new things in bed and experimenting?\",\r\n            \"category\": \"passion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"Yes, definitely!\",\r\n                    \"Now and then - why not?\",\r\n                    \"I'd give it a try\",\r\n                    \"I don't know\",\r\n                    \"Absolutely not\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 25,\r\n            \"question\": \"I can enjoy sex without love\",\r\n            \"category\": \"passion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"always\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"never\"\r\n                ]\r\n            }\r\n        },\r\n        {\r\n            \"id\": 26,\r\n            \"question\": \"For me, a stable relationship is a prerequisite for really good sex\",\r\n            \"category\": \"passion\",\r\n            \"question_type\": {\r\n                \"type\": \"single_choice\",\r\n                \"options\": [\r\n                    \"always\",\r\n                    \"often\",\r\n                    \"sometimes\",\r\n                    \"rarely\",\r\n                    \"never\"\r\n                ]\r\n            }\r\n        }\r\n    ]\r\n}";
    
    this.questions_json = JSON.parse(this.personality_questions_json);

    let cats : CategoriesEnum[] = this.questions_json.categories.sort();
    cats.forEach( e => {
          let questions : IQuestion[] = this.questions_json.questions.filter( a => a.category === e);
          
          this.tempCategory = {} as ICategory;
          this.tempCategory.category = e;
          this.tempCategory.questions = questions;
          
          this.category.push(this.tempCategory);      
    });

    this.setInitialValues();
  }
  
  saveSurvey() : void {
    this.testService.post('saveTest', this.getQuestions()).subscribe(
      response => {
        this.setInitialValues();
      }, error => {
        alert(error);
      }

    );

  }

  numberRange (from:number, to:number) : number[] {
    var array : number[] = [];
    for (var i=from; i<=to; i++){
      array.push(i);
    }
    return array;
  }

  parentQuestionCheck (q:IQuestion) : void{
    let child : string = 'q' + (q.child_question);
    let current : string = 'q' + (q.id);
    if(child!=undefined){
      if(this.surveyForm.get(current)?.value ===  q.child_visibility_condition){
        this.surveyForm.controls[child].enable();
      } else {
        if(this.surveyForm.controls[child] != undefined){
        this.surveyForm.controls[child].setValue("");
        this.surveyForm.controls[child].disable();
        }
      }
    }
  }

  setInitialValues() : void{
    for(var i=0; i<this.category.length;i++){
      let index:number=0;
      for(var j=0; j<this.category[i].questions.length; j++){
        this.category[i].questions[j].answer = "";
      }
    }
  } 

  getQuestions() : IQuestion[]{
    this.answers = [];
    for(var i=0; i<this.category.length;i++){
      for(var j=0; j<this.category[i].questions.length; j++){
        this.answers.push(this.category[i].questions[j]);
      }
    }
    return this.answers;
  }
}