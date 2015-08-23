export default function(){
  this.transition(
    this.fromRoute('index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
};