song = "";

function preload()
{
	//carregar o som e armazenar na variável
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	//armazenar as coordenadas x do pulso direito
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	//armazenar as coordenadas y do pulso esquerdo
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		//desenhar circulo vermelho no pulso amostra

		if(rightWristY >0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Velocidade = 0.5x";		
			//mudar a velocidade para 0.5
		}
		else if(rightWristY >100 && rightWristY <= 200)
		{
			document.getElementById("speed").innerHTML = "Velocidade = 1x";		
			//mudar a velocidade para 1
		}
		else if(rightWristY >200 && rightWristY <= 300)
		{
			document.getElementById("speed").innerHTML = "Velocidade = 1.5x";		
			//mudar a velocidade para 1.5
		}
		else if(rightWristY >300 && rightWristY <= 400)
		{
			document.getElementById("speed").innerHTML = "Velocidade = 2x";		
			//mudar a velocidade para 2
		}
		else if(rightWristY >400)
		{
			document.getElementById("speed").innerHTML = "Velocidade = 2.5x";		
			//mudar a velocidade para 2.5
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY); 
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;		
		//definir o volume
	}

}

function play()
{
	//dar play no som
	//definir o volume inicial
	//definir a velocidade inicial
}
