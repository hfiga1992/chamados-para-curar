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
          <h2 class="text-2xl font-semibold text-primary-800 mb-4">Sobre Natália Leite</h2>
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="w-full md:w-2/3">
              <p class="text-primary-700 mb-4">
                Natália Leite, nascida em 22 de janeiro de 1985, é psicóloga, especialista em Terapia Cognitivo-Comportamental e em Aconselhamento Pastoral e Psicológico. Docente universitária e ministra da Palavra, atua há anos no cuidado integral da alma, com abordagem que une ciência, fé e propósito.
              </p>
              <p class="text-primary-700 mb-4">
                Ao longo de sua caminhada, foi conduzida por Deus a compreender que muitas prisões espirituais têm raízes emocionais profundas. Esse entendimento se transformou em um chamado claro: ser instrumento de restauração e libertação emocional para que pessoas possam acessar o propósito de Deus para suas vidas.
              </p>
              <p class="text-primary-700 mb-4">
                Assim nasceu o ministério Chamados para Curar — uma iniciativa que une fundamentos da psicologia e princípios bíblicos com o objetivo de restaurar emoções e liberar destinos. Por meio desse ministério, Natália tem alcançado vidas em diferentes regiões do Brasil e do mundo, despertando corações a cuidarem da mente e a não se conformarem com pensamentos paralisantes, mas a viverem a boa, agradável e perfeita vontade do Senhor.
              </p>
              <p class="text-primary-700 mb-4">
                É casada com o também psicólogo Emílio Leite e juntos testemunham o milagre de sua filha Clara Valentina, fruto de um tempo de espera e promessa, que se tornou parte do cumprimento do propósito de Deus para a família.
              </p>
              <p class="text-primary-700 mb-4">
                Além do ministério Chamados para Curar, Natália também integra a Equipe de Governo Ministerial da Igreja Cristã Ekballo, em Mogi das Cruzes/SP, onde desempenha funções pastorais e ministeriais com dedicação ao Corpo de Cristo.
              </p>
              <p class="text-primary-700">
                Seu maior desejo é formar uma geração emocionalmente saudável, espiritualmente sensível e preparada para viver com clareza e autoridade os planos eternos do Pai.
                Você também foi chamado para curar — começando por dentro.
              </p>
            </div>
            <div class="w-full md:w-1/3">
              <img
                src="assets/ALP01486.jpg"
                alt="Natália Leite"
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
