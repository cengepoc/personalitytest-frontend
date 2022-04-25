import { CategoriesEnum, QuestionTypesEnum } from "./enums";

export interface IPersonalityTest{
    categories : CategoriesEnum[];
    questions : IQuestion[];
}

export interface IQuestion {
    id : number;
    category : CategoriesEnum;
    question : string;
    question_type :IQuestionType;
    child_question : number;
    child_visibility_condition : string;
    answer : string ;
}

export interface IQuestionType{
    type : QuestionTypesEnum
    options : string[];
    range : INumberRange;
}

export interface INumberRange{
    from : number;
    to : number;
}

export interface ICategory{
    category : CategoriesEnum;
    questions : IQuestion[];
}
