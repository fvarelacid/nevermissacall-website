import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies — NeverMissACall',
  description:
    'Política de cookies do website NeverMissACall. Saiba que cookies e tecnologias de armazenamento utilizamos e como pode geri-los.',
}

export default function CookiesPage() {
  return (
    <>
      <h1>Política de Cookies</h1>
      <p>
        <strong>Última atualização:</strong> 18 de março de 2026
      </p>

      <p>
        A presente política explica como o website NeverMissACall utiliza
        cookies e outras tecnologias de armazenamento local no seu dispositivo.
      </p>

      <h2>1. O que são Cookies e Armazenamento Local?</h2>
      <p>
        <strong>Cookies</strong> são pequenos ficheiros de texto armazenados no
        seu dispositivo (computador, tablet ou telemóvel) quando visita um
        website. Permitem que o site reconheça o seu dispositivo e recorde
        determinadas informações sobre a sua visita.
      </p>
      <p>
        <strong>Armazenamento local (localStorage)</strong> é uma tecnologia
        semelhante que permite ao website guardar informações no seu navegador.
        Ao contrário dos cookies, estes dados não são enviados automaticamente
        ao servidor em cada pedido.
      </p>

      <h2>2. O que Utilizamos no Nosso Website</h2>

      <h3>2.1. Armazenamento Local (localStorage)</h3>
      <p>
        O website NeverMissACall <strong>não define cookies próprios</strong>.
        Utilizamos apenas armazenamento local (localStorage) para registar a sua
        preferência relativa a esta política:
      </p>
      <table>
        <thead>
          <tr>
            <th>Chave</th>
            <th>Tipo</th>
            <th>Finalidade</th>
            <th>Duração</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cookie_consent</td>
            <td>localStorage</td>
            <td>
              Regista a sua escolha (aceitar/rejeitar) no banner de
              consentimento
            </td>
            <td>Até ser limpo manualmente</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2. Cookies de Terceiros</h3>
      <p>
        O nosso website integra serviços de terceiros que podem definir os seus
        próprios cookies quando são carregados:
      </p>
      <ul>
        <li>
          <strong>Calendly</strong> — utilizado para o agendamento de reuniões.
          Quando o widget do Calendly é carregado, este pode definir cookies
          próprios sujeitos à{' '}
          <a
            href="https://calendly.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            política de privacidade do Calendly
          </a>
        </li>
      </ul>
      <p>
        Não utilizamos ferramentas de analítica, pixels de rastreamento ou
        quaisquer outros mecanismos de monitorização de comportamento.
      </p>

      <h2>3. Base Legal</h2>
      <p>
        Em conformidade com o RGPD e a Lei n.º 41/2004 (Lei da Privacidade nas
        Comunicações Eletrónicas):
      </p>
      <ul>
        <li>
          O armazenamento local da preferência de consentimento é considerado
          estritamente necessário para o funcionamento do banner e não requer
          consentimento adicional
        </li>
        <li>
          Os cookies de terceiros (Calendly) são carregados apenas quando o
          utilizador interage com o respetivo widget
        </li>
      </ul>

      <h2>4. Como Gerir Cookies e Armazenamento Local</h2>

      <h3>4.1. Através do Nosso Banner</h3>
      <p>
        Na sua primeira visita ao website, será apresentado um banner que lhe
        permite aceitar ou rejeitar. Pode alterar a sua escolha a qualquer
        momento limpando os dados do site no seu navegador e revisitando o
        website.
      </p>

      <h3>4.2. Através do Navegador</h3>
      <p>
        A maioria dos navegadores permite controlar cookies e armazenamento
        local através das suas definições. Pode:
      </p>
      <ul>
        <li>Bloquear cookies de terceiros</li>
        <li>Limpar dados de armazenamento local para este site</li>
        <li>Navegar em modo privado/incógnito</li>
      </ul>

      <h2>5. Mais Informações</h2>
      <p>
        Para mais informações sobre como tratamos os seus dados pessoais,
        consulte a nossa{' '}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>
      <p>
        Se tiver dúvidas, contacte-nos através de:{' '}
        <a href="mailto:hello@nevermissacall.pt">hello@nevermissacall.pt</a>
      </p>
    </>
  )
}
