import subprocess

def install_libraries():
    libraries = ["flask", "pandas", "matplotlib"]
    
    for lib in libraries:
        subprocess.check_call(["python3", "-m", "pip", "install", lib])

if __name__ == "__main__":
    install_libraries()

from flask import Flask, render_template, request, jsonify, send_file
import pandas as pd
import sqlite3

app = Flask(__name__)


# Inicialização do banco de dados
def init_db():
    conn = sqlite3.connect('samples.db')
    conn.execute('CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY, ponto TEXT, tratamento TEXT, massa REAL, fragmentos INTEGER, fibras INTEGER)')
    conn.close()

init_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add_sample', methods=['POST'])
def add_sample():
    data = request.get_json()
    conn = sqlite3.connect('samples.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO samples (ponto, tratamento, massa, fragmentos, fibras) VALUES (?, ?, ?, ?, ?)", (data['ponto'], data['tratamento'], data['massa'], data['fragmentos'], data['fibras']))
    conn.commit()
    conn.close()
    return jsonify(message='Amostra adicionada com sucesso!')

@app.route('/get_samples', methods=['GET'])
def get_samples():
    conn = sqlite3.connect('samples.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM samples")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/export_samples', methods=['GET'])
def export_samples():
    conn = sqlite3.connect('samples.db')
    df = pd.read_sql_query("SELECT * FROM samples", conn)
    conn.close()
    csv_file = '/path/to/directory/samples.csv'  # Substitua pelo caminho onde você deseja salvar o arquivo CSV
    df.to_csv(csv_file, index=False)
    return send_file(csv_file, as_attachment=True)

@app.route('/plot_samples', methods=['GET'])
def plot_samples():
    conn = sqlite3.connect('samples.db')
    df = pd.read_sql_query("SELECT * FROM samples", conn)
    conn.close()

    plt.figure()
    plt.subplot(3, 1, 1)
    plt.scatter(df['id'], df['massa'], color='blue')
    plt.title('Massa vs ID')

    plt.subplot(3, 1, 2)
    plt.scatter(df['id'], df['fragmentos'], color='green')
    plt.title('Fragmentos vs ID')

    plt.subplot(3, 1, 3)
    plt.scatter(df['id'], df['fibras'], color='red')
    plt.title('Fibras vs ID')

    plt.tight_layout()
    plot_file = '/path/to/directory/samples_plot.png'  # Substitua pelo caminho onde você deseja salvar o gráfico
    plt.savefig(plot_file)
    app.route('/plot_samples', methods=['GET'])
@def plot_samples():
    conn = sqlite3.connect('samples.db')
    df = pd.read_sql_query("SELECT * FROM samples", conn)
    conn.close()

    return df.to_json(orient='records')
    return send_file(plot_file, as_attachment=True)

if __name__ == '__main__':
    app.run()
