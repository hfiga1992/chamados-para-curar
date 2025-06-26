import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  selector: 'app-seminario',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto text-center px-4">
        <h1 class="text-4xl font-bold text-primary-900 mb-6">Seminário Chamados para Curar</h1>

        <div class="bg-primary-50 p-8 rounded-lg shadow-md mb-8">
          <h2 class="text-2xl font-semibold text-primary-800 mb-4">Próximas Datas</h2>
          <p class="text-lg text-primary-700 mb-6">
            Estamos organizando nosso próximo seminário! Fique atento às datas que serão
            divulgadas em breve.
          </p>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-bold text-primary-900 mb-3">O que você vai aprender:</h3>
            <ul class="list-disc text-left pl-8 space-y-2 text-primary-700 max-w-lg mx-auto">
              <li>Fundamentos bíblicos para a cura interior</li>
              <li>Como lidar com traumas e feridas emocionais</li>
              <li>Perdão como caminho para a libertação</li>
              <li>Identidade em Cristo e autoridade espiritual</li>
              <li>Práticas de oração para cura e libertação</li>
            </ul>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-primary-800 mb-4">Inscreva-se na lista de espera</h2>
          <p class="text-primary-700 mb-6">
            Deixe seu e-mail abaixo para ser notificado assim que as inscrições
            para o próximo seminário forem abertas.
          </p>

          <div class="max-w-md mx-auto">
            <div class="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Seu e-mail"
                     class="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50">
              <button class="bg-primary-800 text-white px-6 py-2 rounded-lg hover:bg-primary-900 transition-colors duration-300">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-layout>
  `,
  styles: []
})
export class SeminarioComponent {}
