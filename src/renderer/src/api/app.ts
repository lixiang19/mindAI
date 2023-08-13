import { Client, Account, ID, Databases, Permission, Role } from 'appwrite'
const client = new Client()
  .setEndpoint('http://114.116.237.53:81/v1') // Your API Endpoint
  .setProject('64d5e6d03ed3a756c3b2') // Your project ID
import { getUserInfo } from './user'
export async function login({ email, password }) {
  const account = new Account(client)
  const res = await account.createEmailSession(email, password)
  return res
}
export async function checkUser() {
  const account = new Account(client)
  const res = await account.get()
  console.log('🚀 ~ file: app.ts:17 ~ checkUser ~ res:', res)
  return res
}
// 新增角色
export async function createCharacter() {
  const database = new Databases(client)
  const res = await database.createDocument(
    'userData',
    'usercharacter',
    ID.unique(),
    {
      name: 'multiAnswerRoles',
      label: '多角色回答',
      tags: ['efficiency', 'code'],
      id: 2,
      helloText: '你需要什么帮助？我会创造出符合你需求的多个角色合作回答你的问题',
      prompt:
        '你是一位具有多领域专长的专家级ChatGPT提示工程师。让我们共同合作，根据我提供的提示，创造出最佳的ChatGPT回答。我们的互动将如下进行：我会告诉您如何帮助我。根据我的要求，你会建议在担任专家级ChatGPT提示工程师的基础上，增加其他专家角色，以提供最佳的回答。然后，你会询问是否继续使用建议的角色或对其进行修改以获得最佳效果。如果我同意，你将承担所有额外的专家角色，包括初始的专家级ChatGPT提示工程师角色。如果我不同意，你将询问应删除哪些角色，消除这些角色，并在继续之前保留包括专家级ChatGPT提示工程师角色在内的其余角色。你将确认当前的专家角色，概述每个角色的技能，并询问我是否要修改任何角色。如果我同意，你将询问需要添加或删除哪些角色，我会告诉您。重复步骤5，直到我对角色满意。如果我不同意，请继续执行下一步。你将问：“在{我在步骤1中的回答}方面，我能帮你做些什么？”我会提供我的答案。你将询问我是否想使用任何参考资料来编写完美的提示。如果我同意，你将询问我希望使用多少个{数字}来源。你将逐个请求每个来源，确认你已审查过，并请求下一个。继续，直到你审查完所有来源，然后转到下一步。你将以列表形式要求了解有关我原始提示的更多细节，以充分了解我的期望。我会回答你的问题。从这一点开始，你将根据所有确认的专家角色行事，并使用我原始的提示以及步骤14中的其他细节创建一个详细的ChatGPT提示。呈现新提示并征求我的反馈。如果我满意，你将描述每个专家角色的贡献以及它们如何协作产生全面的结果。然后，询问是否缺少任何输出或专家。16-1.如果我同意，我将指出缺少的角色或输出，您将在重复步骤15之前调整角色。16-2.如果我不同意，你将按照所有确认的专家角色执行所提供的提示，并按照步骤15中概述的方式产生输出。继续执行步骤20。如果我不满意，你将询问提示的具体问题。我将提供补充信息。根据步骤15中的过程生成新的提示，同时考虑步骤18中的反馈。完成回答后，询问我是否需要进行任何修改。如果我同意，询问所需的更改，参考您之前的回答，根据要求进行调整，并生成新的提示。重复步骤15-20，直到我对提示感到满意。',
      icon: 'ri ri-code-line',
      desc: '具有多领域专长的专家级ChatGPT提示工程师共同回答你的问题',
      chatConfig: {
        number_of_memory_sticks: 16
      },
      openAiConfig: {
        max_tokens: 1500,
        temperature: 0.6
      }
    },
    [
      Permission.read(Role.user(getUserInfo()!.$id)),
      Permission.update(Role.user(getUserInfo()!.$id)),
      Permission.delete(Role.user(getUserInfo()!.$id))
    ]
  )
  return res
}
