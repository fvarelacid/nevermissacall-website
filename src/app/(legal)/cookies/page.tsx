import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies — NeverMissACall',
  description:
    'Política de cookies do website NeverMissACall. Saiba que cookies utilizamos e como pode geri-los.',
}

export default function CookiesPage() {
  return (
    <>
      <h1>Política de Cookies</h1>
      <p>
        <strong>Última atualização:</strong> 18 de março de 2026
      </p>

      <p>
        O website NeverMissACall utiliza cookies e tecnologias semelhantes para
        garantir o seu correto funcionamento, melhorar a experiência de
        navegação e analisar a utilização do site. A presente política explica o
        que são cookies, que tipos utilizamos e como pode geri-los.
      </p>

      <h2>1. O que são Cookies?</h2>
      <p>
        Cookies são pequenos ficheiros de texto armazenados no seu dispositivo
        (computador, tablet ou telemóvel) quando visita um website. Permitem que
        o site reconheça o seu dispositivo e recorde determinadas informações
        sobre a sua visita, como as suas preferências de idioma ou de
        apresentação.
      </p>

      <h2>2. Tipos de Cookies Utilizados</h2>

      <h3>2.1. Cookies Estritamente Necessários</h3>
      <p>
        Estes cookies são essenciais para o funcionamento do website e não podem
        ser desativados. São normalmente configurados apenas em resposta a ações
        suas, como definir preferências de privacidade ou preencher formulários.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Finalidade</th>
            <th>Duração</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cookie_consent</td>
            <td>Regista a sua escolha relativa ao consentimento de cookies</td>
            <td>12 meses</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2. Cookies de Desempenho e Analíticos</h3>
      <p>
        Estes cookies permitem-nos contabilizar visitas e fontes de tráfego para
        que possamos medir e melhorar o desempenho do nosso website. Ajudam-nos
        a saber quais são as páginas mais e menos populares e a perceber como os
        visitantes navegam pelo site.
      </p>
      <p>
        Estes cookies só são ativados com o seu consentimento explícito.
      </p>

      <h3>2.3. Cookies de Funcionalidade</h3>
      <p>
        Permitem que o website forneça funcionalidades e personalização
        melhoradas, como a reprodução da demonstração de voz. Podem ser
        definidos por nós ou por fornecedores terceiros cujos serviços
        adicionámos às nossas páginas.
      </p>

      <h3>2.4. Cookies de Terceiros</h3>
      <p>
        Alguns cookies podem ser colocados por serviços de terceiros que
        aparecem nas nossas páginas:
      </p>
      <ul>
        <li>
          <strong>Calendly</strong> — para o agendamento de reuniões integrado
          no website
        </li>
        <li>
          <strong>Vercel</strong> — para analítica de desempenho do website
        </li>
      </ul>

      <h2>3. Base Legal</h2>
      <p>
        Em conformidade com o RGPD e a Lei n.º 41/2004 (Lei da Privacidade nas
        Comunicações Eletrónicas), os cookies estritamente necessários são
        colocados ao abrigo do interesse legítimo (garantir o funcionamento do
        website). Todos os restantes cookies requerem o seu consentimento
        prévio, que é solicitado através do banner de cookies exibido na sua
        primeira visita.
      </p>

      <h2>4. Como Gerir os Cookies</h2>
      <p>Pode gerir as suas preferências de cookies de várias formas:</p>

      <h3>4.1. Através do Nosso Banner de Cookies</h3>
      <p>
        Na sua primeira visita ao website, será apresentado um banner que lhe
        permite aceitar ou rejeitar cookies não essenciais. Pode alterar a sua
        escolha a qualquer momento limpando os cookies do seu navegador e
        revisitando o website.
      </p>

      <h3>4.2. Através do Navegador</h3>
      <p>
        A maioria dos navegadores permite controlar cookies através das suas
        definições. Pode configurar o seu navegador para:
      </p>
      <ul>
        <li>Bloquear todos os cookies</li>
        <li>Aceitar apenas cookies de primeira parte</li>
        <li>Eliminar cookies ao fechar o navegador</li>
        <li>Navegar em modo privado/incógnito</li>
      </ul>
      <p>
        Tenha em atenção que bloquear todos os cookies pode afetar a
        funcionalidade do website.
      </p>

      <h2>5. Prazo de Conservação</h2>
      <p>
        Os cookies que utilizamos têm durações variáveis:
      </p>
      <ul>
        <li>
          <strong>Cookies de sessão</strong> — eliminados automaticamente quando
          fecha o navegador
        </li>
        <li>
          <strong>Cookies persistentes</strong> — permanecem no seu dispositivo
          durante o período indicado na tabela acima ou até serem eliminados
          manualmente
        </li>
      </ul>
      <p>
        Em nenhum caso os cookies persistentes excedem 13 meses, em
        conformidade com as recomendações da CNPD.
      </p>

      <h2>6. Mais Informações</h2>
      <p>
        Para mais informações sobre como tratamos os seus dados pessoais,
        consulte a nossa{' '}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>
      <p>
        Se tiver dúvidas sobre a nossa utilização de cookies, contacte-nos
        através de:{' '}
        <a href="mailto:hello@nevermissacall.pt">
          hello@nevermissacall.pt
        </a>
      </p>
    </>
  )
}
