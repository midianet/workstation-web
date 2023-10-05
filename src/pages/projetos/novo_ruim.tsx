import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Defina o esquema de validação usando Zod
const promptSchema = z.object({
  title: z.string(),
  type: z.enum(['checkbox', 'text', 'select']),
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});

const formSchema = z.object({
  name: z.string(),
  id: z.string(),
  prompts: z.array(promptSchema),
});

// Componente do formulário
const MyForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Simulando a lista de formulários
  const formularios = [
    {
      name: 'Form1',
      id: '1',
      prompts: [
        { title: 'Prompt1', type: 'checkbox' },
        { title: 'Prompt2', type: 'text' },
        {
          title: 'Prompt3',
          type: 'select',
          options: [
            { label: 'Opção1', value: '1' },
            { label: 'Opção2', value: '2' },
          ],
        },
      ],
    },
    // Adicione mais formulários, se necessário
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Escolha um formulário:</label>
        <select {...{ ...control }} name="form">
          {formularios.map((form) => (
            <option key={form.id} value={form.id}>
              {form.name}
            </option>
          ))}
        </select>
        <br />
      </div>

      {/* Renderizar prompts específicos para o formulário selecionado */}
      {formularios.map((form) => (
        <div key={form.id} style={{ display: form.id === getValues('form') ? 'block' : 'none' }}>
          {form.prompts.map((prompt) => (
            <div key={prompt.title}>
              {prompt.type === 'checkbox' && (
                <div>
                  <label>{prompt.title}</label>
                  <Controller
                    name={`prompts.${form.prompts.indexOf(prompt)}.checked`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => <input type="checkbox" {...field} />}
                  />
                  <br />
                </div>
              )}
              {prompt.type === 'text' && (
                <div>
                  <label>{prompt.title}</label>
                  <Controller
                    name={`prompts.${form.prompts.indexOf(prompt)}.value`}
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => <input type="text" {...field} />}
                  />
                  <br />
                </div>
              )}
              {prompt.type === 'select' && (
                <div>
                  <label>{prompt.title}</label>
                  <Controller
                    name={`prompts.${form.prompts.indexOf(prompt)}.value`}
                    control={control}
                    defaultValue={prompt.options ? prompt.options[0].value : ''}
                    rules={{ required: 'Escolha uma opção' }}
                    render={({ field }) => (
                      <select {...field}>
                        {prompt.options &&
                          prompt.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    )}
                  />
                  <br />
                </div>
              )}
              {errors.prompts &&
                errors.prompts[form.prompts.indexOf(prompt)] &&
                errors.prompts[form.prompts.indexOf(prompt)].type === 'required' && (
                  <span style={{ color: 'red' }}>Este campo é obrigatório</span>
                )}
            </div>
          ))}
        </div>
      ))}

      <input type="submit" value="Enviar" />
    </form>
  );
};

export default MyForm;