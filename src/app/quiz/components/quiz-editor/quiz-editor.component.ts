import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
})
export class QuizEditorComponent implements OnInit {
  public form!: FormGroup;

  public get questionsFormArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      randomOrder: [true],
      movingBetween: [true],
      showCorrect: [false],
      questions: this.formBuilder.array([]),
    });
  }

  public addQuestion(): void {
    const question: FormGroup = this.formBuilder.group({
      content: ['', Validators.required],
      answers: this.formBuilder.array([]),
    })
    this.addAnswer(this.getFormArray(question.get('answers')));
    this.questionsFormArray.push(question);
  }

  public addAnswer(answers: FormArray): void {
    answers.push(this.formBuilder.group({
      content: ['', Validators.required],
      isCorrect: [false],
    }));
  }

  public getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public getFormArray(control: AbstractControl | null): FormArray {
    return control as FormArray;
  }

  public saveChanges(): void {
    // todo
    console.log(this.form.value);
  }
}
