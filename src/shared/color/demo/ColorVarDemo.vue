<template>
  <div class="xd-block">
    <h4>About the CSS variable</h4>
    <p>
      XUI use explicit generated css variable as its color system. Each color
      contain 3 associated variable, which is rgb, a and the color itself. eg:
    </p>
    <ul>
      <li>
        rgb: <code class="xd-code"> --xv-red--900--rgb: 91, 23, 28; </code>
      </li>
      <li>
        alpha channel:
        <code class="xd-code">--xv-red--900--a: 1.000;</code>(not to confused
        with opacity)
      </li>
      <li>
        composited:
        <code class="xd-code">
          --xv-red--900: rgb(var(--xv-red--900--rgb), var(--xv-red--900--a, 1));
        </code>
      </li>
    </ul>

    <h4>Meaning of the name</h4>
    <p>There are mainly 3 part of the naming system: prefix, name, type</p>

    <h5>Prefix</h5>
    <code class="xd-code">--xv-</code> is the prefix, this only avoid conflict
    with other name.

    <h5>Name</h5>
    <p>
      <code class="xd-code">red--900</code> is the name. If you check it's name
      in figma, it should be <code class="xd-code">red/900</code>, where red is
      a group name and 900 is the variant. We transform each group separator
      into <code class="xd-code">--</code>.
    </p>
    <p>
      There is more naming rule, eg.
      <code class="xd-code">Black and White/fast-block</code> in figma will turn
      into <code class="xd-code">blackandwhite--fast-block</code>.
    </p>
    <p>
      You can see that some of the character is ignore, spaces, in this case.
      Actually we only allow alphanumeric plus <code class="xd-code">-</code> in
      string, and we also turn all character into lower case for better
      consistence.
    </p>

    <h5>Type</h5>
    <p>
      The <code class="xd-code">--rgb</code> part is a special syntax in css
      variable, it contain 3 comma separated 8-bit color integer without any
      color specifier.
    </p>
    <p>
      It cannot directly used as a color but provide the ability to compose
      alpha chanel at browser runtime. Take a look at the composited one. It
      compose these value in an RGB color specified with alpha channel. So the
      color can be used as a color syntax.
    </p>
  </div>
</template>
