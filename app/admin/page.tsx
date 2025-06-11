'use client';

import React, { useState } from 'react';

export default function AdminProductsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const products = [
    { id: '1', name: 'Игровые наушники', price: 75.99, stock: 150, category: 'Электроника' },
    { id: '2', name: 'Беспроводная мышь', price: 29.5, stock: 200, category: 'Электроника' },
    { id: '3', name: 'Механическая клавиатура', price: 120.0, stock: 80, category: 'Компьютеры' },
    { id: '4', name: 'Монитор 27 дюймов', price: 300.0, stock: 50, category: 'Компьютеры' },
  ];

  return (
    <div className='flex min-h-screen bg-gray-950 text-gray-100 font-sans'>
      <aside className='w-64 bg-gray-900 text-white p-4 flex flex-col shadow-lg border-r border-gray-800'>
        <h1 className='text-2xl font-bold mb-8 text-blue-400 text-center'>
          Панель Админа E-commerce
        </h1>
        <nav className='flex-grow'>
          <ul className='space-y-3'>
            <li>
              <a
                href='#'
                onClick={() => setActiveSection('overview')}
                className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200
                  ${
                    activeSection === 'overview'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
              >
                <span className='mr-3 text-lg'>📊</span> Обзор
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => setActiveSection('list')}
                className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200
                  ${
                    activeSection === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
              >
                <span className='mr-3 text-lg'>📦</span> Мои Товары
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => setActiveSection('add-edit')}
                className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200
                  ${
                    activeSection === 'add-edit'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
              >
                <span className='mr-3 text-lg'>➕</span> Добавить Товар
              </a>
            </li>
            <li className='pt-4 border-t border-gray-700 mt-4'>
              <a
                href='#'
                className='flex items-center py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300'
              >
                <span className='mr-3 text-lg'>🛒</span> Заказы
              </a>
            </li>
            <li>
              <a
                href='#'
                className='flex items-center py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300'
              >
                <span className='mr-3 text-lg'>⚙️</span> Настройки
              </a>
            </li>
          </ul>
        </nav>
        {/* Кнопка выхода */}
        <div className='mt-auto pt-6 border-t border-gray-800'>
          <button className='w-full py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 transition-colors duration-200 text-white font-semibold shadow-md'>
            Выйти
          </button>
        </div>
      </aside>

      <main className='flex-1 p-8 overflow-y-auto'>
        <header className='mb-8 pb-4 border-b border-gray-700 flex items-center justify-between'>
          <h2 className='text-3xl font-semibold text-gray-100'>
            {activeSection === 'overview' && 'Обзор Магазина'}
            {activeSection === 'list' && 'Управление Товарами'}
            {activeSection === 'add-edit' && 'Добавить/Редактировать Товар'}
          </h2>
          {activeSection === 'list' && (
            <button
              onClick={() => setActiveSection('add-edit')}
              className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-colors duration-200 font-medium'
            >
              Добавить новый товар
            </button>
          )}
        </header>

        {activeSection === 'overview' && (
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            <div className='bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-gray-700'>
              <h3 className='text-xl font-semibold mb-2 text-gray-300'>Всего Продаж</h3>
              <p className='text-5xl font-extrabold text-green-500'>$12,345.67</p>
              <p className='text-sm text-gray-400 mt-2'>
                <span className='text-green-400'>↑ 15%</span> за последний месяц
              </p>
            </div>
            <div className='bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-gray-700'>
              <h3 className='text-xl font-semibold mb-2 text-gray-300'>Всего Товаров</h3>
              <p className='text-5xl font-extrabold text-blue-500'>250</p>
              <p className='text-sm text-gray-400 mt-2'>
                <span className='text-blue-400'>↑ 5</span> новых за неделю
              </p>
            </div>
            <div className='bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-gray-700'>
              <h3 className='text-xl font-semibold mb-2 text-gray-300'>Новые Заказы</h3>
              <p className='text-5xl font-extrabold text-yellow-500'>18</p>
              <p className='text-sm text-gray-400 mt-2'>Ожидают обработки</p>
            </div>
          </section>
        )}

        {activeSection === 'list' && (
          <section className='bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700'>
            <h3 className='text-2xl font-semibold mb-6 text-gray-100'>Список Всех Товаров</h3>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Поиск товаров...'
                className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
              />
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-700'>
                <thead className='bg-gray-700'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      ID
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      Название Товара
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      Цена
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      На складе
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      Категория
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-gray-400'>{product.id}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-gray-100'>{product.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-gray-200'>
                        ${product.price.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-gray-200'>{product.stock}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-gray-300'>
                        {product.category}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <button
                          onClick={() => alert(`Редактировать ${product.name}`)}
                          className='text-indigo-500 hover:text-indigo-700 mr-4'
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => alert(`Удалить ${product.name}`)}
                          className='text-red-500 hover:text-red-700'
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === 'add-edit' && (
          <section className='bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-semibold mb-6 text-gray-100'>
              Добавить Новый Товар
            </h3>
            <form className='space-y-5'>
              <div>

                <label
                  htmlFor='productName'
                  className='block text-gray-300 text-sm font-medium mb-2'
                >
                  Название Товара
                </label>
                <input
                  type='text'
                  id='productName'
                  placeholder='Игровые наушники XYZ'
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                />
              </div>

              <div>
                <label
                  htmlFor='productDescription'
                  className='block text-gray-300 text-sm font-medium mb-2'
                >
                  Описание
                </label>
                <textarea
                  id='productDescription'
                  placeholder='Полное описание товара...'
                  rows={4}
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y'
                ></textarea>
              </div>

              {/* Поля Цена и Количество на складе (в одной строке) */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label
                    htmlFor='productPrice'
                    className='block text-gray-300 text-sm font-medium mb-2'
                  >
                    Цена ($)
                  </label>
                  <input
                    type='number'
                    id='productPrice'
                    placeholder='99.99'
                    step='0.01'
                    className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                  />
                </div>
                <div>
                  <label
                    htmlFor='productStock'
                    className='block text-gray-300 text-sm font-medium mb-2'
                  >
                    На складе
                  </label>
                  <input
                    type='number'
                    id='productStock'
                    placeholder='100'
                    className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                  />
                </div>
              </div>

              <div>

                <label
                  htmlFor='productCategory'
                  className='block text-gray-300 text-sm font-medium mb-2'
                >
                  Категория
                </label>
                <select
                  id='productCategory'
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer'
                >
                  <option value=''>Выберите категорию</option>
                  <option value='electronics'>Электроника</option>
                  <option value='computers'>Компьютеры</option>
                  <option value='accessories'>Аксессуары</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='productImage'
                  className='block text-gray-300 text-sm font-medium mb-2'
                >
                  Изображение
                </label>
                <input
                  type='file'
                  id='productImage'
                  className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600'
                />
              </div>

              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  type='button'
                  className='bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md transition-colors duration-200 font-medium'
                >
                  Отмена
                </button>
                <button
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-colors duration-200 font-semibold'
                >
                  Сохранить Товар
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
