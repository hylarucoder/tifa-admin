import React from 'react';
import { TCachePanel } from '../store';

export const CachePanel = ({ panel }: { panel: TCachePanel }) => {
  return (
    <>
      <h4>{'Summary'}</h4>
      <table>
        <thead>
          <tr>
            <th>{'Total calls'}</th>
            <th>{'Total time'}</th>
            <th>{'Cache hits'}</th>
            <th>{'Cache misses'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{panel.totalCalls}</td>
            <td>{panel.totalTime} ms</td>
            <td>{panel.hits}</td>
            <td>{panel.misses}</td>
          </tr>
        </tbody>
      </table>
      <h4>{'Commands'}</h4>
      <table>
        <thead>
          <tr>
            {panel.counts.map((count) => {
              return <th key={count.name}>{count.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {panel.counts.map((count) => {
              return <td key={count.name}>{count.value}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <h4>{'Calls'}</h4>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>{'Time (ms)'}</th>
            <th>{'Type'}</th>
            <th>{'Arguments'}</th>
            <th>{'Keyword arguments'}</th>
            <th>{'Backend'}</th>
          </tr>
        </thead>
        <tbody>
          {panel.calls.map((call, i) => {
            return (
              <>
                <tr id="cacheMain_{{ forloop.counter }}">
                  <td className="djdt-toggle">
                    <button
                      className="djToggleSwitch"
                      data-toggle-name="cacheMain"
                      data-toggle-id="{{ forloop.counter }}"
                    >
                      +
                    </button>
                  </td>
                  <td>{call.time}</td>
                  <td>{call.name}</td>
                  <td>{call.args}</td>
                  <td>{call.kwargs}</td>
                  <td>{call.backend}</td>
                </tr>
                <tr
                  className="djUnselected djToggleDetails_{{ forloop.counter }}"
                  id="cacheDetails_{{ forloop.counter }}"
                >
                  <td colSpan={1}></td>
                  <td colSpan={5}>
                    <pre className="djdt-stack">{call.trace}</pre>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
