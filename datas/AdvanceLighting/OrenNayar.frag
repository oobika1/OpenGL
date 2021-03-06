#version 430
layout(location=0) out vec4 FragColor;
uniform vec4 LightColor;
uniform vec4 DiffColor;
uniform float roughness;
in vec3 eNormal;
in vec4 eVertex;
in vec4 eLightPos;

void main()
{
	vec3 n = normalize(eNormal);
	vec3 ldir = normalize(eLightPos.xyz - eVertex.xyz);
	vec3 vdir = normalize(-eVertex.xyz);
	float LtoN = dot(ldir, n);
	float NtoV = dot(n, vdir);
	float roughness2 = roughness * roughness;
	float A = 1.0 - 0.5 * (roughness2 / (roughness2 + 0.33));
	float B = 0.45 * (roughness2 / (roughness2 + 0.09));
	float C = max(0.0, dot( normalize(vdir - n * NtoV) , normalize(ldir - n * LtoN) ));
	float LtoNAgl = acos(LtoN);
	float NtoVAgl = acos(NtoV);
	float alpha = max(LtoNAgl, NtoVAgl);
	float beta = min(LtoNAgl, NtoVAgl);
	
	vec4 color = DiffColor * LtoN * (A + B * sin(alpha) * tan(beta) * C) * LightColor;
	FragColor = vec4(color); 
}