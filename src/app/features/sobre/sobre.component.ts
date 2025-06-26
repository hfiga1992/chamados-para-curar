import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterModule],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="title text-3xl font-bold text-primary-900 mb-6 text-center">Sobre o Chamados para Curar</h1>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-primary-800 mb-4">Nossa Missão</h2>
          <p class="text-primary-700 mb-4">
            O projeto Chamados para Curar surgiu com a missão de levar cura, libertação e restauração
            para pessoas que estão passando por momentos difíceis. Através de devocionais diários,
            estudos bíblicos e conteúdo exclusivo, buscamos auxiliar no processo de cura espiritual,
            emocional e mental.
          </p>
          <p class="text-primary-700 mb-4">
            Nossa visão é ser um instrumento nas mãos de Deus para alcançar aqueles que necessitam
            de uma palavra de esperança e restauração, promovendo um encontro verdadeiro com Cristo.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-primary-800 mb-4">Sobre a Pastora Natália Leite</h2>
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="w-full md:w-2/3">
              <p class="text-primary-700 mb-4">
                Natália Leite é pastora, conferencista e escritora com mais de 15 anos de experiência
                ministerial. Formada em Teologia e especializada em aconselhamento cristão, dedica sua
                vida a ajudar pessoas a encontrarem cura e propósito através da fé.
              </p>
              <p class="text-primary-700">
                Com uma abordagem acolhedora e profunda conhecedora das escrituras, a Pastora Natália
                desenvolve um trabalho que tem transformado milhares de vidas através de suas pregações,
                livros e do projeto Chamados para Curar.
              </p>
            </div>
            <div class="w-full md:w-1/3">
              <img
                src="assets/ALP01486.jpg"
                alt="Pastora Natália Leite"
                class="rounded-lg shadow-md w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
              >
            </div>
          </div>
        </section>

        <section class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <!-- <h2 class="text-2xl font-semibold text-primary-800 mb-4">Tipos de Conta</h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold text-primary-900 mb-3">Conta Gratuita</h3>
              <ul class="list-disc pl-5 space-y-2 text-primary-700">
                <li>Acesso ao devocional diário</li>
                <li>Participação na comunidade online</li>
                <li>Conteúdo básico de estudos</li>
              </ul>
            </div>

            <div class="bg-primary-50 p-6 rounded-lg shadow-md border-2 border-primary-200">
              <h3 class="text-xl font-bold text-primary-900 mb-3">Conta Premium</h3>
              <ul class="list-disc pl-5 space-y-2 text-primary-700">
                <li>Todos os benefícios da conta gratuita</li>
                <li>Acesso a devocionais exclusivos e arquivados</li>
                <li>Material completo de estudos bíblicos</li>
                <li>Grupo de suporte exclusivo</li>
                <li>Consultoria espiritual personalizada</li>
                <li>Acesso a eventos especiais e seminários online</li>
              </ul>
            </div>
          </div> -->

          <div class="mt-6 text-center">
            <a href="https://hotmart.com/pt-br/marketplace/produtos/chamados-para-curar-feridas-fechadas-propositos-abertos/J99779886D" class="inline-block bg-primary-800 text-white px-6 py-2 rounded-lg hover:bg-primary-900 transition-colors duration-300" target="_blank">
              Conheça o projeto
            </a>
          </div>
        </section>
      </div>
    </app-layout>
  `,
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent {}
