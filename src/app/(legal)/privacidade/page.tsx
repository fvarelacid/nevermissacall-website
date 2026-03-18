import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade — NeverMissACall',
  description:
    'Política de privacidade do serviço NeverMissACall. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <>
      <h1>Política de Privacidade</h1>
      <p>
        <strong>Última atualização:</strong> 18 de março de 2026
      </p>

      <p>
        A NeverMissACall (&quot;nós&quot;, &quot;nosso&quot; ou
        &quot;Empresa&quot;) compromete-se a proteger a privacidade dos
        utilizadores do seu website e dos seus serviços. A presente Política de
        Privacidade explica como recolhemos, utilizamos, armazenamos e
        protegemos os seus dados pessoais, em conformidade com o Regulamento
        Geral sobre a Proteção de Dados (RGPD) — Regulamento (UE) 2016/679 — e
        com a legislação portuguesa aplicável.
      </p>

      <h2>1. Responsável pelo Tratamento</h2>
      <p>
        O responsável pelo tratamento dos dados pessoais recolhidos através
        deste website é a NeverMissACall, com sede em Portugal.
      </p>
      <p>
        Para qualquer questão relacionada com a proteção de dados, pode
        contactar-nos através do e-mail:{' '}
        <a href="mailto:hello@nevermissacall.pt">
          hello@nevermissacall.pt
        </a>
      </p>

      <h2>2. Dados Pessoais Recolhidos</h2>
      <p>
        No âmbito da utilização do nosso website e serviços, podemos recolher os
        seguintes dados pessoais:
      </p>
      <ul>
        <li>
          <strong>Nome</strong> — fornecido através do formulário de contacto
        </li>
        <li>
          <strong>Endereço de e-mail</strong> — fornecido através do formulário
          de contacto
        </li>
        <li>
          <strong>Número de telefone</strong> — fornecido através do formulário
          de contacto
        </li>
        <li>
          <strong>Dados de navegação</strong> — endereço IP, tipo de navegador,
          páginas visitadas e duração da visita, recolhidos automaticamente
          através de cookies
        </li>
      </ul>

      <h2>3. Finalidades do Tratamento</h2>
      <p>Os seus dados pessoais são tratados para as seguintes finalidades:</p>
      <ul>
        <li>
          Responder a pedidos de contacto e fornecer informações sobre os nossos
          serviços
        </li>
        <li>
          Disponibilizar a demonstração do agente de voz com inteligência
          artificial
        </li>
        <li>Agendar reuniões e demonstrações comerciais</li>
        <li>Enviar comunicações comerciais (apenas com o seu consentimento)</li>
        <li>Melhorar o website e a experiência do utilizador</li>
        <li>Cumprir obrigações legais e regulamentares</li>
      </ul>

      <h2>4. Base Legal para o Tratamento</h2>
      <p>
        O tratamento dos seus dados pessoais baseia-se nas seguintes bases
        legais, previstas no artigo 6.º do RGPD:
      </p>
      <ul>
        <li>
          <strong>Consentimento (art. 6.º, n.º 1, al. a)</strong> — quando
          submete o formulário de contacto ou aceita cookies não essenciais
        </li>
        <li>
          <strong>Execução de diligências pré-contratuais (art. 6.º, n.º 1, al. b)</strong>{' '}
          — quando solicita informações sobre os nossos serviços ou uma
          demonstração
        </li>
        <li>
          <strong>Interesse legítimo (art. 6.º, n.º 1, al. f)</strong> — para
          melhoria do website e análise de utilização
        </li>
      </ul>

      <h2>5. Partilha de Dados e Subprocessadores</h2>
      <p>
        Os seus dados pessoais podem ser partilhados com os seguintes
        prestadores de serviços (subprocessadores), que atuam em nosso nome e
        sob as nossas instruções:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — alojamento de base de dados e
          armazenamento de dados de leads
        </li>
        <li>
          <strong>Vercel</strong> — alojamento do website
        </li>
        <li>
          <strong>Calendly</strong> — agendamento de reuniões
        </li>
      </ul>
      <p>
        Não vendemos, alugamos ou cedemos os seus dados pessoais a terceiros
        para fins de marketing.
      </p>

      <h2>6. Transferências Internacionais de Dados</h2>
      <p>
        Alguns dos nossos subprocessadores poderão estar localizados fora do
        Espaço Económico Europeu (EEE). Nesses casos, asseguramos que existem
        garantias adequadas, nomeadamente cláusulas contratuais-tipo aprovadas
        pela Comissão Europeia ou decisões de adequação.
      </p>

      <h2>7. Prazo de Conservação</h2>
      <p>
        Os seus dados pessoais serão conservados apenas durante o período
        necessário para as finalidades para as quais foram recolhidos:
      </p>
      <ul>
        <li>
          <strong>Dados de leads</strong> — conservados durante 24 meses após o
          último contacto, salvo se existir uma relação contratual
        </li>
        <li>
          <strong>Dados de navegação</strong> — conservados durante 13 meses, em
          conformidade com as recomendações da CNPD
        </li>
      </ul>

      <h2>8. Direitos dos Titulares dos Dados</h2>
      <p>
        Nos termos do RGPD, tem direito a:
      </p>
      <ul>
        <li>
          <strong>Acesso</strong> — obter confirmação sobre se os seus dados
          estão a ser tratados e aceder aos mesmos
        </li>
        <li>
          <strong>Retificação</strong> — solicitar a correção de dados
          inexatos ou incompletos
        </li>
        <li>
          <strong>Apagamento</strong> — solicitar a eliminação dos seus dados
          (&quot;direito ao esquecimento&quot;)
        </li>
        <li>
          <strong>Limitação do tratamento</strong> — solicitar a restrição do
          tratamento em determinadas circunstâncias
        </li>
        <li>
          <strong>Portabilidade</strong> — receber os seus dados num formato
          estruturado e de leitura automática
        </li>
        <li>
          <strong>Oposição</strong> — opor-se ao tratamento dos seus dados,
          incluindo para fins de marketing direto
        </li>
        <li>
          <strong>Retirar o consentimento</strong> — a qualquer momento, sem
          comprometer a licitude do tratamento realizado com base no
          consentimento previamente dado
        </li>
      </ul>
      <p>
        Para exercer qualquer um destes direitos, contacte-nos através do
        e-mail:{' '}
        <a href="mailto:hello@nevermissacall.pt">
          hello@nevermissacall.pt
        </a>
      </p>

      <h2>9. Reclamações</h2>
      <p>
        Se considerar que o tratamento dos seus dados pessoais viola o RGPD, tem
        o direito de apresentar uma reclamação junto da Comissão Nacional de
        Proteção de Dados (CNPD):{' '}
        <a
          href="https://www.cnpd.pt"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnpd.pt
        </a>
      </p>

      <h2>10. Segurança</h2>
      <p>
        Implementamos medidas técnicas e organizativas adequadas para proteger
        os seus dados pessoais contra acesso não autorizado, perda, destruição
        ou alteração, incluindo encriptação de dados em trânsito (HTTPS) e em
        repouso, e controlo de acessos.
      </p>

      <h2>11. Alterações a esta Política</h2>
      <p>
        Reservamo-nos o direito de atualizar esta Política de Privacidade a
        qualquer momento. Quaisquer alterações serão publicadas nesta página com
        a data de última atualização revista. Recomendamos que consulte esta
        página periodicamente.
      </p>
    </>
  )
}
