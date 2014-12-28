#pragma once
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <stdio.h>
#include "Application.h"
#include "Model.h"
#include "Renderer.h"

class ModelImporterApp : public Application{
public:

	virtual void Render(double elapseTime) override {
		_renderer.render();
	}

	virtual void Setup() override {
		_model = new Model("datas/teapot.obj");
		_renderer.attachRenderableObject(_model);
		_renderer.depthTest(true);
		_renderer.setClearColor(glm::vec4(0.5f, 0.5f, 0.5f, 1.0f));
		//glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
	}

protected:

private:

	Model *_model;
};