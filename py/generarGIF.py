from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random

# Configuración
ancho, alto = 400, 200
fotogramas = []
fuente = ImageFont.truetype("fuente/Comfortaa-Regular.ttf", 48)  # Cambia por tu fuente

# Paleta de colores modernos
colores = [(255, 255, 255), (0, 255, 200), (255, 100, 200), (100, 200, 255)]

# Crear 30 fotogramas
for _ in range(30):
    fondo = Image.new("RGB", (ancho, alto), color=(10, 10, 30))
    dibujo = ImageDraw.Draw(fondo)

    # Fondo degradado sutil
    for y in range(alto):
        tono = int(10 + y * 0.5)
        dibujo.line([(0, y), (ancho, y)], fill=(tono, tono, tono))

    # Dibujar números aleatorios con estilo
    for _ in range(10):
        numero = str(random.randint(0, 9))
        x = random.randint(0, ancho - 60)
        y = random.randint(0, alto - 60)
        color = random.choice(colores)
        dibujo.text((x, y), numero, font=fuente, fill=color)

    # Efecto de resplandor
    resplandor = fondo.filter(ImageFilter.GaussianBlur(radius=1))
    fondo = Image.blend(fondo, resplandor, alpha=0.3)

    fotogramas.append(fondo)

# Guardar como GIF
fotogramas[0].save(
    "arte_numerico.gif",
    save_all=True,
    append_images=fotogramas[1:],
    duration=120,
    loop=0
)