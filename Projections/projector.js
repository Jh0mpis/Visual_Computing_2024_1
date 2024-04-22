class Projector{
  constructor(){
    this.orthographic = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0]
    ];
    
    this.mode = 1;
    this.distance = 2;
    
    this.posible_rotations = [];
    
    this.rotation = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }
  
  project(matmul, points){
    let rotated = matmul(this.rotation, points);
    
    if(this.mode === 1){      
      return matmul(this.orthographic, rotated);      
    }else if(this.mode === 2){
      let w = 1/(this.distance - rotated[3]);
      this.perspective = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0]
      ];
      
      return matmul(this.perspective, rotated);      
    }
  }
  
  rotations(matmul, axis, angle){
    this.posible_rotations[0] = [
      [cos(angle), -sin(angle), 0, 0],
      [sin(angle), cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    this.posible_rotations[1] = [
      [cos(angle), 0, -sin(angle), 0],
      [0, 1, 0, 0],
      [sin(angle), 0, cos(angle), 0],
      [0, 0, 0, 1]
    ];
    this.posible_rotations[2] = [
      [cos(angle), 0, 0, -sin(angle)],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [sin(angle), 0, 0, cos(angle)],
    ];
    this.posible_rotations[3] = [
      [1, 0, 0, 0],
      [0, cos(angle), -sin(angle), 0],
      [0, sin(angle), cos(angle), 0],
      [0, 0, 0, 1]
    ];
    this.posible_rotations[4] = [
      [1, 0, 0, 0],
      [0, cos(angle), 0, -sin(angle)],
      [0, 0, 1, 0],
      [0, sin(angle),  0, cos(angle)]
    ];
    this.posible_rotations[5] = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)]
    ];
    
    this.rotation = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    
    for(let i = 0; i < 6; i++){
      if(axis[i]){
        this.rotation = matmul(this.rotation, this.posible_rotations[i]);
      }
    }
  }
}
