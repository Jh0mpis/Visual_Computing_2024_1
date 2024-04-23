class Figure{
  constructor(scl, size){
    this.scl = scl;
    this.points = [];
    this.projected = []
    this.connections = [];
    this.size = size;
  }
    
  update(matmul, projector){
    for(let i = 0; i< this.points.length; i++){
      let projection = projector.project(matmul, this.points[i]);
      
      this.projected[i] = [this.scl*projection[0], 
                          this.scl*projection[1], 
                          this.scl*projection[2]];
    }
  }
  
  connect(i, j, points){
    push();
    stroke(255);
    line(points[i][0], points[i][1], points[i][2], points[j][0], points[j][1], points[j][2]);
    pop();
  }
  
  render(){
    for(let j = 0; j < this.projected.length; j++){
       push();
       translate(this.projected[j][0], this.projected[j][1], this.projected[j][2]);
       sphere(5);
       pop();
    }
    for(let i = 0; i < this.connections.length; i++){
      this.connect(this.connections[i][0], this.connections[i][1], this.projected);
    }
  }
  
  set_connections(){
    for(let i = 0; i<this.points.length; i++){
      for(let j = i+1; j<this.points.length; j++){
        if(this.distance(i, j) - this.size <= 1e-2){
          this.connections.push([i, j]);
        }
      }
    }
  }
  
  distance(i, j){
    let a = this.points[i];
    let b = this.points[j];
    return sqrt((a[0][0]-b[0][0])**2+(a[1][0]-b[1][0])**2+(a[2][0]-b[2][0])**2+(a[3][0]-b[3][0])**2);
  }
}

class Pentachoron extends Figure{
  constructor(scl){
    super(scl, sqrt(5/2));
    
    this.points[0] = [[sqrt(5)/4], [sqrt(5)/4], [sqrt(5)/4], [-1/4]];
    this.points[1] = [[sqrt(5)/4], [-sqrt(5)/4], [-sqrt(5)/4], [-1/4]];
    this.points[2] = [[-sqrt(5)/4], [sqrt(5)/4], [-sqrt(5)/4], [-1/4]];
    this.points[3] = [[-sqrt(5)/4], [-sqrt(5)/4], [sqrt(5)/4], [-1/4]];
    this.points[4] = [[0], [0], [0], [1]];
    
    this.set_connections();
  }
}

class Tesseract extends Figure{
  constructor(scl){
    super(scl, 1);
    
    this.points[0]  = [[-0.5], [-0.5], [-0.5], [-0.5]];
    this.points[1]  = [[ 0.5], [-0.5], [-0.5], [-0.5]];
    this.points[2]  = [[ 0.5], [ 0.5], [-0.5], [-0.5]];
    this.points[3]  = [[-0.5], [ 0.5], [-0.5], [-0.5]];
    this.points[4]  = [[-0.5], [-0.5], [ 0.5], [-0.5]];
    this.points[5]  = [[ 0.5], [-0.5], [ 0.5], [-0.5]];
    this.points[6]  = [[ 0.5], [ 0.5], [ 0.5], [-0.5]];
    this.points[7]  = [[-0.5], [ 0.5], [ 0.5], [-0.5]];
    
    this.points[8]  = [[-0.5], [-0.5], [-0.5], [0.5]];
    this.points[9]  = [[ 0.5], [-0.5], [-0.5], [0.5]];
    this.points[10] = [[ 0.5], [ 0.5], [-0.5], [0.5]];
    this.points[11] = [[-0.5], [ 0.5], [-0.5], [0.5]];
    this.points[12] = [[-0.5], [-0.5], [ 0.5], [0.5]];
    this.points[13] = [[ 0.5], [-0.5], [ 0.5], [0.5]];
    this.points[14] = [[ 0.5], [ 0.5], [ 0.5], [0.5]];
    this.points[15] = [[-0.5], [ 0.5], [ 0.5], [0.5]];
    
    this.set_connections();
  }
}

class Orthoplex extends Figure{
  constructor(scl){
    super(scl, sqrt(2));
    
    this.points[0]  = [[1], [0], [0], [0]];
    this.points[1]  = [[0], [1], [0], [0]];
    this.points[2]  = [[0], [0], [1], [0]];
    this.points[3]  = [[0], [0], [0], [1]];
    this.points[4]  = [[-1], [0], [0], [0]];
    this.points[5]  = [[0], [-1], [0], [0]];
    this.points[6]  = [[0], [0], [-1], [0]];
    this.points[7]  = [[0], [0], [0], [-1]];
    
    this.set_connections();
  }
}

class Hyper_diamond extends Figure{
  constructor(scl){
    super(scl, sqrt(2));
    
    let n = 0;
    
    let units = [1, -1];
    let perms = [[0, 1, 2, 3], [0, 2, 1, 3], [0, 3, 1, 2], [1, 3, 0, 2],  [2, 3, 0, 1], [1, 2, 0 , 3]];
    
    for(let i =0; i<6; i++){
      for(let j = 0; j<2; j++){
        for(let k = 0; k<2; k++){
          this.points[n] = [];
          this.points[n][perms[i][0]] = [units[j]];
          this.points[n][perms[i][1]] = [units[k]];
          this.points[n][perms[i][2]] = [0];
          this.points[n][perms[i][3]] = [0];
          n++;
        }
      }
    }
    
    this.set_connections();
  }
}

class Tetraplex extends Figure{
  constructor(scl){    
    let n = 0
    
    let golden_ratio = (1+sqrt(5))/2;    
    let golden_vector = [golden_ratio/2, 1/2, 1/(2*golden_ratio), 0];
    
    super(scl, 1/golden_ratio);
    
    let units = [1, -1];
    let permutations = [[0, 1, 3, 2], [0, 2, 1, 3], [0, 3, 2, 1],
                  [1, 0, 2, 3], [1, 2, 3, 0], [1, 3, 0, 2],
                  [2, 0, 3, 1], [2, 1, 0, 3], [2, 3, 1, 0],
                  [3, 0, 1, 2], [3, 1, 2, 0], [3, 2, 0, 1]
    ];
    
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 4; j++){
        this.points[n] = [];
        this.points[n][j] = [units[i]];
        this.points[n][(j+1)%4] = [0];
        this.points[n][(j+2)%4] = [0];
        this.points[n][(j+3)%4] = [0];
        n++;
      }
    }
    
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 2; j++){
        for(let k = 0; k < 2; k++){
          for(let w = 0; w < 2; w++){
            this.points[n] = [];
            this.points[n][0] = [units[i]/2];
            this.points[n][1] = [units[j]/2];
            this.points[n][2] = [units[k]/2];
            this.points[n][3] = [units[w]/2];
            n++;
          }
        }
      }
    }
    
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 2; j++){
        for(let k = 0; k < 2; k++){
          for(let p = 0; p < permutations.length; p++){
            this.points[n] = [];
            if(golden_vector[permutations[p][0]] === 0){
              this.points[n][0] = [0];
              this.points[n][1] = [units[i]*golden_vector[permutations[p][1]]];
              this.points[n][2] = [units[j]*golden_vector[permutations[p][2]]];
              this.points[n][3] = [units[k]*golden_vector[permutations[p][3]]];
            }else if(golden_vector[permutations[p][1]] === 0){
              this.points[n][0] = [units[i]*golden_vector[permutations[p][0]]];
              this.points[n][1] = [0];
              this.points[n][2] = [units[j]*golden_vector[permutations[p][2]]];
              this.points[n][3] = [units[k]*golden_vector[permutations[p][3]]];
            }else if(golden_vector[permutations[p][2]] === 0){
              this.points[n][0] = [units[i]*golden_vector[permutations[p][0]]];
              this.points[n][1] = [units[j]*golden_vector[permutations[p][1]]];
              this.points[n][2] = [0];
              this.points[n][3] = [units[k]*golden_vector[permutations[p][3]]];
            }else if(golden_vector[permutations[p][3]] === 0){
              this.points[n][0] = [units[i]*golden_vector[permutations[p][0]]];
              this.points[n][1] = [units[j]*golden_vector[permutations[p][1]]];
              this.points[n][2] = [units[k]*golden_vector[permutations[p][2]]];
              this.points[n][3] = [0];
            }
            
            n++;
          }
        }
      }
    }
    
    this.set_connections();
  }
}
